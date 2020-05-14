<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>基本資料查詢</span>
      </div>
      <el-form size="mini" status-icon class="queryBlock" :model="query" :rules="rules" ref="query">
        <el-form-item label="資料型態">
          <el-select v-model="userType" placeholder="请选择">
            <el-option v-for="item in userTypeOption" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="統編/證件號碼" prop="identity">
          <el-input placeholder="请输入内容" v-model="query.identity" class="input-with-select" clearable>
          </el-input>
        </el-form-item>
        <el-form-item class="btnBlock">
          <el-button type="primary" @click="getInfo">查詢</el-button>
          <el-button  @click="init">清除</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <consumer :userData=info v-if="userType === 'C'"> </consumer>
    <hotel :hotelData=info v-if="userType === 'H'"> </hotel>
    <store :storeData=info v-if="userType === 'S'"> </store>

  </div>
</template>


<script>
  var options = require('@/assets/js/options.js');
  import consumer from './Consumer';
  import hotel from './Hotel';
  import store from './Store';

  export default {
    name: "BasicInfoQuery",
    components: {
      consumer,
      hotel,
      store
    },
    data() {
      return {
        userType: "S",
        query: {
          identity: "",
        },
        rules: {
          identity: [{
            required: true,
            message: '請輸入統編/證號',
            trigger: ['blur', 'change']
          }],
        },
        info: {},
        userTypeOption: options.userType
      }
    },
    methods: {
      init() {
        var vi = this;
        vi.query = {
          identity: ''
        };
        vi.info = {};
        vi.resetForm("query");
      },
      getInfo() {
        // API: /whitelist/getWhiteListInfo/{S}/{identity}

        var vi = this;
        vi.$refs["query"].validate((valid) => {
          if (valid) {
            if (this.userType === "C")
              this.info = this.getUserInfo();
            if (this.userType === "H")
              this.info = this.getHotelInfo();
            if (this.userType === "S")
              this.info = this.getStoreInfo();
          } else {
            return false;
          }
        });
      },
      getUserInfo() {
        // API: /whitelist/getWhiteListInfo/{S}/{identity}
        return {
          userId: "412",
          username: "user12345",
          identity: "A123456789",
          name: "王O明",
          birthday: "1988/12/30",
          email: "service@urtrip.com.tw",
          mobile: "0988***456"
        }
      },
      getHotelInfo() {
        // API: /whitelist/getWhiteListInfo/{S}/{identity}
        return {
          userId: "123",
          username: "user12345",
          businessNo: "12345678",
          name: "捷絲旅林森館",
          address: "臺北市中山區林森北路117號3樓至9樓",
          latitude: "25.052427",
          longitude: "121.548535"
        }
      },
      getStoreInfo() {
        // API: /whitelist/getWhiteListInfo/{S}/{identity}
        return {
          userId: "25343",
          username: "user12345",
          name: "天下書坊",
          owner: "何秀惠",
          type: "3",
          address: "高雄市苓雅區復興二路19-4號",
          latitude: "25.0506120",
          longitude: "121.5252020"
        }
      }
    },
    mounted() {
      this.init();
    },
    watch: {
      userType: {
        deep: true,
        immediate: true,
        handler(val) {
          this.info = {};
          this.identity = null;
          this.resetForm("query");
        }
      }
    }
  };

</script>
