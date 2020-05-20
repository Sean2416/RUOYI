<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>抵用券核銷查詢</span>
      </div>
      <el-form status-icon class="queryBlock" size="mini" :model="query" :rules="rules" ref="query">
        <el-form-item label="查詢區間">
          <el-radio-group v-model="query.interval">
            <el-radio :label="7">近一周</el-radio>
            <el-radio :label="14">近三周</el-radio>
            <el-radio :label="0">自訂</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自訂區間">
          <el-date-picker v-model="query.date" value-format="yyyy/MM/dd" type="daterange" range-separator="至"
            start-placeholder="開始日期" :disabled="query.interval !== 0 " end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="店家證件號碼" prop="identity">
          <el-input placeholder="请输入内容" v-model="query.identity" class="input-with-select" clearable>
          </el-input>
        </el-form-item>
        <el-form-item class="btnBlock">
          <el-button type="primary" @click="getTransInfo">查詢</el-button>
          <el-button  @click="init" type="danger">清除</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="detailCard">
      <el-table :data="result.weeklyTransaction" border style="width: 100%" empty-text="暫無資料">
        <el-table-column type="index" width="40">
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
        <el-table-column width="70" label="明細">
          <template slot-scope="scope">
            <el-button @click="showDetail(scope.row)" type="text" size="medium" icon="el-icon-tickets"></el-button>
          </template>
        </el-table-column>
      </el-table>

       <pagination         
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
        />

    </el-card>

     <el-dialog title="週結明細" :visible.sync="dialogDetail" width="80%">
      <detailTable :weekData= weekData></detailTable>
    </el-dialog>

  </div>
</template>


<script>
  import detailTable from './WriteOffDetailTable';

  export default {
    name: "CouponWriteOffHistory",
    components: {
      detailTable
    },
    data() {
      return {
        query: {},
        weekData:{},
        result: {},
        dialogDetail: false,
        total: 2,
        queryParams: {
          pageNum: 1,
          pageSize: 10
        },
        rules: {
          identity: [{
            required: true,
            message: '請輸入統編/證號',
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
          identity: '',
          interval: 7,
          date: vi.getDateInterval(7, 0)
        };
        vi.result = {};
        vi.weekData = {};
        vi.resetForm("query");
      },
      showDetail(row) {
        this.dialogDetail = true;
        this.weekData = row;
      },
      getTransInfo() {
        // API /payment/weeklyTx

        this.result = {
          "incomeTotal": 5500,
          "storeName" : "小吃店",
          "dailyTransaction": [{
              "showDate": "2020/04/09 (三)",
              "showAmount": 1000
            },
            {
              "showDate": "2020/04/08 (二)",
              "showAmount": 1000
            },
            {
              "showDate": "2020/04/07 (一)",
              "showAmount": 1000
            }
          ],
          "weeklyTransaction": [{
              "weeklyTxId": 849,
              "startDate": "2020/04/27",
              "endDate": "2020/05/03",
              "totalAmount": 3000,
              "isConfirm": "Y",
              "statusDesc": "待確認"
            },
            {
              "weeklyTxId": 850,
              "startDate": "2020/05/04",
              "endDate": "2020/05/11",
              "totalAmount": 2500,
              "isConfirm": "N",
              "statusDesc": "待確認"
            }
          ]
        };
        this.setColumnLabel();
      },
      setColumnLabel() {
        var vi = this;

        vi.result.weeklyTransaction.forEach(element => {
          element.storeName = vi.result.storeName;
          element.interval = element.startDate + "~" +element.endDate;
          element.isConfirmLabel = vi.convertStatusFromString(element.isConfirm);
        });
      },
    },
    watch: {
      'query.interval'() {
        var vi = this;
        vi.query.date = vi.getDateInterval(vi.query.interval, 0)
      },
    }
  };

</script>
