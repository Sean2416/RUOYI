<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>白名單查詢</span>
      </div>
      <el-row :gutter="10">
        <el-col :xs="18" :sm="18" :md="12" class="infoBlock">
          <el-input v-model="identity">
            <template slot="prepend">統編或證號</template>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button icon="el-icon-search" @click="getStoreInfo()"></el-button>
        </el-col>
      </el-row>
    </el-card>

   <whitelistInfo :storeData=store> </whitelistInfo>

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
        identity:"",
        store: {}
      }
    },
    methods: {
      getStoreInfo() {
        // API: /whitelist/getWhiteListInfo/{S}/{identity}
        this.store = {
          id: "148",
          owner: "吳宜之",
          name: "兔仔書坊",
          tax_no: "47898499",
          address: "屏東縣恆春鎮復興路103-2號1F",
          latitude: "25.052427",
          longitude: "121.548535",
          phonenumber: "02-27528168",
          email: "service@urtrip.com.tw",
          store_name_mk: "小兔仔書窩"
        }
      }
    },
  };

</script>
