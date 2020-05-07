<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="10">
          <el-input  v-model="taxNo">
            <template slot="prepend">統一編號</template>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button icon="el-icon-search" @click="getStoreInfo()" ></el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-table :data="storeList" border style="width: 100%">
          <el-table-column fixed prop="taxNo" label="統一編號" width="180">
          </el-table-column>
          <el-table-column prop="name" label="商家名稱">
          </el-table-column>
          <el-table-column prop="phonenumber" label="電話">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
          <el-table-column width="80" label="明細">
            <template slot-scope="scope">
              <el-button @click="showDetail(scope.row)" type="text" size="small" icon="el-icon-more"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>

    <el-dialog title="商家資訊" :visible.sync="dialogVisible" width="80%" >
      <whitelistInfo :storeData = store>
      </whitelistInfo>
    </el-dialog>

  </div>
</template>


<script>
  import whitelistInfo from './Info';
  export default {
    name: "WhiteListQuery",
    components: {
      whitelistInfo
    },
    data() {
      return {
        taxNo: "",
        dialogVisible: false,
        storeList: [],
        store:{}
      }
    },
    methods: {
      showDetail(row) {
        this.dialogVisible = true;
        this.store = row;
      },
      getStoreInfo() {
        // API: /store/whitelist/{taxNo}
        this.storeList = [{
          searchValue: null,
          createBy: null,
          createTime: "2020-04-22 10:04:07",
          updateBy: null,
          updateTime: "2020-04-28 11:08:06",
          remark: null,
          dataScope: null,
          params: {},
          id: "C4_315080000H_000077",
          owner: null,
          name: "IKEA宜家家居 敦北店",
          taxNo: "84906084",
          username: null,
          password: null,
          address: "台北市松山區敦化北路100號B1",
          latitude: "25.052427",
          longitude: "121.548535",
          phonenumber: "02-27528168",
          email: "service@urtrip.com.tw",
          isAgreeTerms: "1",
          isRegisted: "1",
          type: "1",
          isNMarket: "1",
          isTMarket: "1",
          isFoodbeverage: "0",
          isCulture: "1",
          isSightseeing: "1"
        },{
          searchValue: null,
          createBy: null,
          createTime: "2020-04-22 10:04:07",
          updateBy: null,
          updateTime: "2020-04-28 11:08:06",
          remark: null,
          dataScope: null,
          params: {},
          id: "C4_315080000H_000077",
          owner: null,
          name: "小兔仔書坊",
          taxNo: "72616413",
          username: null,
          password: null,
          address: "宜蘭縣員山鄉尚深路124號",
          latitude: "25.048631",
          longitude: "121.544216",
          phonenumber: "0922961278",
          email: "service@urtrip.com.tw",
          isAgreeTerms: "1",
          isRegisted: "1",
          type: "1",
          isNMarket: "1",
          isTMarket: "1",
          isFoodbeverage: "0",
          isCulture: "1",
          isSightseeing: "1"
        }]
      }
    },
  };

</script>
