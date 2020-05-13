<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>消費者查詢</span>
      </div>
      <el-form status-icon class="queryBlock" :model="query" :rules="rules" ref="query">
        <el-form-item label="身分證號碼" prop="identity">
          <el-input placeholder="请输入内容" v-model="query.identity" class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search" @click="getUserInfo"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </el-card>

    <consumerInfo :userData=user></consumerInfo>

    <el-card>
      <div slot="header" class="clearfix">
        <span>抵用券資料</span>
        <el-button style="float: right; margin-right:10px" type="danger" plain icon="el-icon-refresh"
          v-if="coupon.couponType ==='P'" @click="resetPrintStatus()">重置列印狀態</el-button>
      </div>
      <el-form class="showInfo">
        <el-form-item label="領取方式">
          <el-input v-model="couponTypeLabel" readonly></el-input>
        </el-form-item>
        <el-form-item label="兌換碼" v-if="coupon.couponType ==='P'">
          <el-input v-model="coupon.printCode" readonly></el-input>
        </el-form-item>
        <el-form-item label="列印時間" v-if="coupon.couponType ==='P'">
          <el-input v-model="coupon.printTime" readonly></el-input>
        </el-form-item>
        <el-form-item label="列印狀態" v-if="coupon.couponType ==='P'">
          <el-input v-model="coupon.couponPrintType" readonly></el-input>
        </el-form-item>
        <el-form-item label="申請業者">
          <el-input v-model="coupon.applyHotel" readonly></el-input>
        </el-form-item>
        <el-form-item label="發券時間">
          <el-input v-model="coupon.applyTime" readonly></el-input>
        </el-form-item>
        <el-form-item label="已使用金額">
          <el-input v-model="coupon.consumed" readonly></el-input>
        </el-form-item>
        <el-form-item label="剩餘金額">
          <el-input v-model="coupon.balance" readonly></el-input>
        </el-form-item>
      </el-form>

      <el-table :data="coupon.couponTypeInfo" border style="width: 100%" empty-text="暫無資料">
        <el-table-column prop="typeName" label="抵用券類別" width="180" sortable>
        </el-table-column>
        <el-table-column prop="consumed" label="已使用金額" sortable>
        </el-table-column>
        <el-table-column prop="balance" label="剩餘金額	" sortable>
        </el-table-column>
        <el-table-column width="80" label="明細">
          <template slot-scope="scope">
            <el-button @click="showDetail(scope.row)" type="text" size="medium" icon="el-icon-tickets"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="抵用券類別清單" :visible.sync="dialogCouponInfo" width="80%">
      <couponInfoTable :dataList=couponInfoList></couponInfoTable>
    </el-dialog>

  </div>
</template>


<script>
  import $ from 'jquery';
  var options = require('@/assets/js/options.js');
  import consumerInfo from '../BasicInfo/Consumer';
  import couponInfoTable from './CouponInfoTable';

  export default {
    name: "CouponConsumerQuery",
    components: {
      consumerInfo,
      couponInfoTable
    },
    data() {
      return {
        query: {
          identity: ''
        },
        rules: {
          identity: [{
            required: true,
            message: '請輸入統編/證號',
            trigger: ['blur', 'change']
          }],
        },
        user: {},
        coupon: {},
        couponType: options.couponType,
        couponTypeLabel: "",
        dialogCouponInfo: false,
        couponInfoList: []
      }
    },
    methods: {
      showDetail(row) {
        this.dialogCouponInfo = true;
        this.couponInfoList = row.couponInfo;
      },
      resetPrintStatus() {
        this.user = {};
        this.coupon = {};
        //API:  /coupon/resetPrint
      },
      getUserInfo() {
        // API: /profile/getUserProfile
        var vi = this;
        vi.$refs["query"].validate((valid) => {
          if (valid) {
            vi.user = {
              userId: 412,
              username: "user12345",
              identity: "N120913984",
              name: "王O明",
              birthday: "1988/12/30",
              mobile: "0988***456",
              email: "dsa*********@gmail.com"
            };
            vi.getCouponOverview();
          } else {
            return false;
          }
        });
      },
      getCouponOverview() {
        // API: /coupon/overview/{identity}
        this.coupon = {
          applyHotel: "夏一棧民宿",
          applyTime: "2020/07/04 16:24:18",
          couponType: "P",
          printCode: "0600124569",
          printTime: "2020/07/04 16:24:18",
          consumed: "250",
          balance: "550",
          couponTypeInfo: [{
              fundType: "0",
              typeName: "夜市類",
              consumed: "200",
              balance: "0",
              couponInfo: [{
                  couponId: "s3042908c1727978c77ce",
                  isUsed: "1",
                  consumeTime: "2020/06/03 10:23:45",
                  amount: "50",
                  storeName: "美味佳小吃店",
                  storeType: "0"
                },
                {
                  couponId: "s3042908c1727978c77cf",
                  isUsed: "0",
                  consumeTime: "",
                  amount: "",
                  storeName: "",
                  storeType: ""
                }
              ]
            },
            {
              fundType: "2",
              typeName: "商圈類",
              consumed: "500",
              balance: "500",
              couponInfo: [{
                couponId: "s3042908c1727978c77ce",
                isUsed: "1",
                consumeTime: "2020/06/03 10:23:45",
                amount: "500",
                storeName: "IKEA宜家家居 敦北店",
                storeType: "2"
              }]
            },
            {
              fundType: "3",
              typeName: "藝文類",
              consumed: "0",
              balance: "1000",
              couponInfo: []
            }
          ]
        };
      },
    },
    watch: {
      'coupon.couponType'() {
        var vi = this;
        let type = $.grep(vi.couponType, function (r) {
          return r.value == vi.coupon.couponType;
        })
        vi.couponTypeLabel = type[0].label;
      },
    }
  };

</script>
