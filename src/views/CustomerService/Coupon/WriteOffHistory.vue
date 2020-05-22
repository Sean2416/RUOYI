<template>
  <div>
    <loadingPage :loadingText="loadingText"></loadingPage>
    <el-card>
      <div slot="header" class="clearfix">
        <span>抵用券核銷查詢</span>
      </div>
      <el-form status-icon class="queryBlock" size="mini" :model="query" :rules="rules" ref="query">
        <el-form-item label="店家帳號" prop="username">
          <el-input placeholder="请输入内容" v-model="query.username" class="input-with-select" clearable>
          </el-input>
        </el-form-item>
        <el-form-item class="btnBlock">
          <el-button type="primary" @click="getTransInfo(query)">查詢</el-button>
          <el-button @click="init" type="danger">清除</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="detailCard">
      <el-table :data="result.weeklyTransaction" border style="width: 100%" empty-text="暫無資料">        
        <el-table-column width="70" label="明細" align="center" >
          <template slot-scope="scope">
            <el-button @click="showDetail(scope.row)" type="text" size="medium" icon="el-icon-tickets"></el-button>
          </template>
        </el-table-column>
        <el-table-column prop="storeName" label="店名" sortable>
        </el-table-column>
        <el-table-column prop="interval" label="週結起迄日" sortable>
        </el-table-column>
        <el-table-column prop="totalAmount" label="週結總金額" sortable>
        </el-table-column>
        <el-table-column prop="isConfirmLabel" label="確認週結" width="180" sortable>
        </el-table-column>
        <el-table-column prop="statusDesc" label="撥款狀態" sortable>
        </el-table-column>
        <el-table-column prop="statusDesc" label="銷帳狀態" sortable>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" :page.sync="query.page" :limit.sync="query.limit"
        @pagination="getTransInfo" />

    </el-card>

    <el-dialog title="週結明細" :visible.sync="dialogDetail" width="80%">
      <detailTable :weekData=weekData :userName=query.username :isDialogVisible= dialogDetail></detailTable>
    </el-dialog>

  </div>
</template>


<script>
  import loadingPage from '@/views/tool/loading/LoadingPage';
  import detailTable from './WriteOffDetailTable';
  import {
    getweeklyTx,
  } from "@/api/customerService/payment";

  export default {
    name: "CouponWriteOffHistory",
    components: {
      detailTable,
      loadingPage
    },
    data() {
      return {
        query: {},
        weekData: {},
        result: {},
        dialogDetail: false,
        loadingText: null,
        queryDisable: false,
        total: 0,
        rules: {
          username: [{
            required: true,
            message: '請輸店家帳號',
            trigger: ['blur', 'change']
          }],
        }
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        var vi = this;
        vi.query = {
          username: "",
          page: 1,
          limit: 10
        };
        vi.result = {};
        vi.weekData = {};
        vi.resetForm("query");
        vi.queryDisable = false;
      },
      showDetail(row) {
        this.dialogDetail = true;
        this.weekData = row;
      },
      getTransInfo(val) {
        var vi = this;
        console.log(val)
        vi.$refs["query"].validate((valid) => {
          if (valid) {
            vi.loadingText = '搜尋中';
            getweeklyTx(vi.query.username, val.limit, val.page).then(res => {
              vi.loadingText = null;
              console.log(res.result)
              if (vi.checkResponseValue(res.result, "weeklyTransaction")) {
                vi.total = res.result.totalRecords;
                vi.result.weeklyTransaction = vi.convertDataToArray(res.result.weeklyTransaction);
                vi.queryDisable = true;
                vi.setColumnLabel();
              } else
                vi.createWarm("查無資料");
            }).catch(error => {
              vi.loadingText = null;
            });
          }
        });
      },
      setColumnLabel() {
        var vi = this;

        vi.result.weeklyTransaction.forEach(element => {
          element.interval = element.weekStart + "~" + element.weekEnd;
          element.isConfirmLabel = vi.convertStatusFromString(element.isConfirm);
        });
      },
    },
    watch: {
    }
  };

</script>
