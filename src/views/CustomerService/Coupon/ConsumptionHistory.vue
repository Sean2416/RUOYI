<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>消費紀錄查詢</span>
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
        <el-form-item label="身分證號碼" prop="identity">
          <el-input placeholder="请输入内容" v-model="query.identity" class="input-with-select" clearable>
          </el-input>
        </el-form-item>
        <el-form-item class="btnBlock">
          <el-button type="primary" @click="getTransInfo">查詢</el-button>
          <el-button  @click="init">清除</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="detailCard">
      <el-table :data="couponInfoList" border style="width: 100%" empty-text="暫無資料">
        <el-table-column type="index" width="40">
        </el-table-column>
        <el-table-column prop="couponId" label="抵用券序號" width="180" sortable>
        </el-table-column>
        <el-table-column prop="storeName" label="消費店名" sortable>
        </el-table-column>
        <el-table-column prop="consumeTime" label="消費時間" sortable>
        </el-table-column>
        <el-table-column prop="amount" label="抵用券金額" sortable>
        </el-table-column>
        <el-table-column prop="typeName" label="消費類別" sortable>
        </el-table-column>
        <el-table-column prop="" label="補助機構" sortable>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>


<script>
  export default {
    name: "CouponConsumptionHistory",
    components: {},
    data() {
      return {
        query: {},
        rules: {
          identity: [{
            required: true,
            message: '請輸入統編/證號',
            trigger: ['blur', 'change']
          }],
        },
        couponInfoList: []
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
          date: vi.getDateInterval(-7, 0)
        };
        vi.couponInfoList = [];
        vi.resetForm("query");
      },
      getTransInfo() {

        var vi = this;
        // API /coupon/transactionHistory

        vi.$refs["query"].validate((valid) => {
          if (valid) {
            this.couponInfoList = [{
                couponId: "s3042908c1727978c77ce",
                consumeTime: "2020/06/03 10:23:45",
                amount: "50",
                storeName: "美味佳小吃店",
                storeType: "0,1"
              },
              {
                couponId: "130552010951096604T3",
                consumeTime: "2020/06/03 10:23:45",
                amount: "50",
                storeName: "AAAA",
                storeType: "1,2"
              }
            ];
          } else {
            return false;
          }

        });

        this.setColumnLabel();
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
