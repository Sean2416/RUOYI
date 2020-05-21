<template>
  <div>
    <loadingPage :loadingText="loadingText"></loadingPage>
    <el-card>
      <div slot="header" class="clearfix">
        <span>消費紀錄查詢</span>
      </div>
      <el-form status-icon class="queryBlock" size="mini" :model="query" ref="query">
        <el-form-item label="查詢區間">
          <el-radio-group v-model="query.interval" :disabled="queryDisable">
            <el-radio :label="7">近一周</el-radio>
            <el-radio :label="21">近三周</el-radio>
            <el-radio :label="0">自訂</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自訂區間">
          <el-date-picker v-model="query.date" value-format="yyyy/MM/dd" type="daterange" range-separator="至"
            start-placeholder="開始日期" :disabled="query.interval !== 0 || queryDisable" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="消費券類型">
          <el-select v-model="query.couponType" :disabled="queryDisable">
            <el-option v-for="item in couponType" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="帳號">
          <el-input :disabled="queryDisable" v-model="query.username" class="input-with-select" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="身分證號碼">
          <el-input :disabled="queryDisable" v-model="query.identity" class="input-with-select" clearable>
          </el-input>
        </el-form-item>
        <el-form-item class="btnBlock">
          <el-button type="primary" @click="getTransInfo(query)" :disabled="queryDisable">查詢</el-button>
          <el-button @click="init" type="danger">清除</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <div slot="header" class="clearfix">
        <span>消費紀錄</span>
      </div>
      <el-table :data="couponInfoList" border style="width: 100%" empty-text="暫無資料">
        <el-table-column prop="couponId" label="抵用券序號" width="180" sortable>
        </el-table-column>
        <el-table-column prop="consumeTime" label="消費時間" sortable>
        </el-table-column>
        <el-table-column prop="amount" label="抵用券金額" sortable>
        </el-table-column>
        <el-table-column prop="typeName" label="消費類別" sortable>
        </el-table-column>
      </el-table>

      <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="query.page"
      :limit.sync="query.limit"
      @pagination="getTransInfo"
    />

    </el-card>
  </div>
</template>


<script>
  import loadingPage from '@/views/tool/loading/LoadingPage';
  var options = require('@/assets/js/options.js');
  import {
    getTransactionHistory
  } from "@/api/customerService/coupon";

  export default {
    name: "CouponConsumptionHistory",
    components: {
      loadingPage
    },
    data() {
      return {
        query: {},
        couponInfoList: [],
        total: 0,
        loadingText: null,
        couponType: options.couponType,
        queryDisable: false
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
          identity: "",
          couponType: "A",
          interval: 7,
          date: vi.getDateInterval(7, 0),
          limit: 10,
          page: 1
        };
        vi.couponInfoList = [];
        vi.total = 0;
        vi.queryDisable = false;
      },
      queryParamValid() {
        var vi = this;
        if (vi.query.username === "" && vi.query.identity === "") {
          vi.createWarm("請至少輸入一個查詢條件");
          return false;
        }
        return true;
      },
      getTransInfo(val) {
        var vi = this;
        if (vi.queryParamValid()) {
          vi.loadingText = '搜尋中';
          getTransactionHistory(vi.query.identity, vi.query.username, "C",vi.query.couponType ,"-1" ,vi.query.date[0], vi.query.date[1], val.limit.toString(), val.page.toString())
            .then(res => {
              vi.loadingText = null;
              if (vi.checkResponseValue(res.result, "couponInfo")) {
                vi.total = res.result.totalRecords;
                vi.couponInfoList = vi.convertDataToArray(res.result.couponInfo);
                vi.setColumnLabel();
                vi.queryDisable = true;
              } else
                vi.createWarm("查無資料");
            }).catch(error => {
              vi.loadingText = null;
            });
        }
      },
      setColumnLabel() {
        var vi = this;
        vi.couponInfoList.forEach(element => {
          element.typeName = vi.convertStoreType(element.storeType);
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
