<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>白名單查詢</span>
      </div>
      <el-form  size="mini" status-icon class="queryBlock" :model="query" :rules="rules" ref="query">
        <el-form-item label="統編/證號" prop="identity">
          <el-input placeholder="请输入内容" v-model="query.identity" class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search" @click="getStoreInfo"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
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
        store: {}
      }
    },
    methods: {
      getStoreInfo() {
        // API: /whitelist/getWhiteListInfo/{S}/{identity}
        var vi = this;
        vi.$refs["query"].validate((valid) => {
          if (valid) {
            vi.store = {
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
          } else {
            return false;
          }
        });
      }
    },
  };

</script>
