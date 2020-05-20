<template>
  <div>
    <loadingPage :loadingText="loadingText"></loadingPage>
    <el-card>
      <div slot="header" class="clearfix">
        <span>消費者查詢</span>
      </div>
      <el-form status-icon class="queryBlock" size="mini" :model="query" ref="query">
        <el-form-item label="帳號">
          <el-input :disabled="queryDisable" v-model="query.username" class="input-with-select" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="身分證號碼">
          <el-input :disabled="queryDisable" v-model="query.identity" class="input-with-select" clearable>
          </el-input>
        </el-form-item>
        <el-form-item class="btnBlock">
          <el-button type="primary" @click="getUserInfo" :disabled="queryDisable">查詢</el-button>
          <el-button @click="init" type="danger">清除</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <div slot="header" class="clearfix">
        <span>消費者資料</span>
      </div>
      <el-table :data="userList" border style="width: 100%" empty-text="暫無資料">
        <el-table-column width="50" align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="selectUser(scope.row)" type="text" size="medium" icon="el-icon-view"></el-button>
          </template>
        </el-table-column>
        <el-table-column type="expand" label="明細">
          <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="生日" class="table-expand-item">
                <span>{{ props.row.birthday }}</span>
              </el-form-item>
              <el-form-item label="電子信箱" class="table-expand-item">
                <span>{{ props.row.email}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" sortable>
        </el-table-column>
        <el-table-column prop="username" label="帳號" sortable>
        </el-table-column>
        <el-table-column prop="identity" label="身分證" sortable>
        </el-table-column>
        <el-table-column prop="mobile" label="手機號碼" sortable>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card>
      <div slot="header" class="clearfix">
        <span>抵用券資料</span>
        <el-button style="float: right; margin-right:10px" type="primary" plain icon="el-icon-refresh"
          v-if="coupon.couponType ==='P'" @click="resetPrintStatus()">重置列印狀態</el-button>
      </div>
      <el-form class="showInfo">
        <el-form-item label="領取方式">
          <el-input v-model="coupon.couponTypeLabel" readonly></el-input>
        </el-form-item>
        <el-form-item label="兌換碼" v-if="coupon.couponType ==='P'">
          <el-input v-model="coupon.printCode" readonly></el-input>
        </el-form-item>
        <el-form-item label="列印時間" v-if="coupon.couponType ==='P'">
          <el-input v-model="coupon.printTime" readonly></el-input>
        </el-form-item>
        <el-form-item label="列印狀態" v-if="coupon.couponType ==='P'">
          <el-input placeholder="" v-model="coupon.couponPrintType">
            <template slot="prepend">
              <el-button @click="resetPrintStatus()" type="danger" icon="el-icon-refresh"></el-button>
            </template>
          </el-input>
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
        <el-table-column type="index" width="40">
        </el-table-column>
        <el-table-column prop="typeName" label="抵用券類別" width="180" sortable>
        </el-table-column>
        <el-table-column prop="consumed" label="已使用金額" sortable>
        </el-table-column>
        <el-table-column prop="balance" label="剩餘金額	" sortable>
        </el-table-column>
        <el-table-column width="50" label="明細">
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
  import consumerInfo from '../BasicInfo/Consumer';
  import couponInfoTable from './CouponInfoTable';
  import loadingPage from '@/views/tool/loading/LoadingPage';
  import {
    getUserProfile,
    getCouponOverview,
    resetPrint
  } from "@/api/CustomerService/coupon";

  export default {
    name: "CouponConsumerQuery",
    components: {
      consumerInfo,
      couponInfoTable,
      loadingPage
    },
    data() {
      return {
        queryDisable: false,
        loadingText: null,
        query: {
          username: null,
          identity: null
        },
        selectedRow: {},
        userList: [],
        coupon: {},
        couponInfoList: [],
        dialogCouponInfo: false,
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        var vi = this;
        vi.query = {
          username: null,
          identity: null
        };
        vi.userList = [];
        vi.coupon = {};
        vi.selectedRow = {};
        vi.couponInfoList = [];
        vi.resetForm("query");
        vi.queryDisable = false;
      },
      selectUser(row) {
        var vi = this;
        vi.coupon = {};
        vi.getCouponOverview(row);
      },
      showDetail(row) {
        this.dialogCouponInfo = true;
        this.couponInfoList = row.couponInfo;
      },
      queryParamValid() {
        var vi = this;
        if ((vi.query.username === null || vi.query.username === "") &&
          (vi.query.identity === null || vi.query.identity === "")) {
          vi.createWarm("請至少輸入一個查詢條件");
          return false;
        }
        return true;
      },
      getUserInfo() {
        var vi = this;
        if (vi.queryParamValid()) {
          vi.loadingText = '搜尋中';
          getUserProfile("C", vi.query.username, vi.query.identity).then(res => {
            vi.loadingText = null;
            if (vi.checkResponseValue(res.result, "consumer")) {
              vi.userList = vi.convertDataToArray(res.result.consumer);
              vi.queryDisable = true;
            } else
              vi.createWarm("查無資料");
          }).catch(error => {
            vi.loadingText = null;
          });
        }
      },
      getCouponOverview(row) {
        var vi = this;
        vi.selectedRow = row;
        vi.loadingText = '搜尋中';

        getCouponOverview(row.identity, row.username).then(res => {
          vi.loadingText = null;
          if (vi.checkResponseValue(res.result, "couponOverview")) {
            vi.coupon = res.result.couponOverview;
            vi.coupon.couponTypeInfo = vi.convertDataToArray(vi.coupon.couponTypeInfo);
          } else
            vi.createWarm("查無資料");
        }).catch(error => {
          vi.loadingText = null;
        });

        // this.coupon = {
        //   applyHotel: "夏一棧民宿",
        //   applyTime: "2020/07/04 16:24:18",
        //   couponType: "P",
        //   printCode: "0600124569",
        //   printTime: "2020/07/04 16:24:18",
        //   consumed: "250",
        //   balance: "550",
        //   couponTypeInfo: [{
        //       fundType: "0",
        //       typeName: "夜市類",
        //       consumed: "200",
        //       balance: "0",
        //       couponInfo: [{
        //           couponId: "s3042908c1727978c77ce",
        //           isUsed: "1",
        //           consumeTime: "2020/06/03 10:23:45",
        //           amount: "50",
        //           storeName: "美味佳小吃店",
        //           storeType: "0,1"
        //         },
        //         {
        //           couponId: "s3042908c1727978c77cf",
        //           isUsed: "0",
        //           consumeTime: "",
        //           amount: "",
        //           storeName: "",
        //           storeType: ""
        //         }
        //       ]
        //     },
        //     {
        //       fundType: "2",
        //       typeName: "商圈類",
        //       consumed: "500",
        //       balance: "500",
        //       couponInfo: [{
        //         couponId: "s3042908c1727978c77ce",
        //         isUsed: "1",
        //         consumeTime: "2020/06/03 10:23:45",
        //         amount: "500",
        //         storeName: "IKEA宜家家居 敦北店",
        //         storeType: "1,2"
        //       }]
        //     },
        //     {
        //       fundType: "3",
        //       typeName: "藝文類",
        //       consumed: "0",
        //       balance: "1000",
        //       couponInfo: []
        //     }
        //   ]
        // };
      },
      resetPrintStatus() {
        var vi = this;
        
        console.log( vi.selectedRow)
        //API:  /coupon/resetPrint
      },
    },
    watch: {
      'coupon.couponType'() {
        var vi = this;
        vi.coupon.couponTypeLabel = vi.convertCouponType(vi.coupon.couponType);
      },
    }
  };

</script>
