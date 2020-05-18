<template>
  <div>
    <loadingPage :loadingText="loadingText"></loadingPage>
    <el-card>
      <div slot="header" class="clearfix">
        <span>基本資料查詢</span>
      </div>
      <el-form size="mini" status-icon class="queryBlock" :model="query" ref="query">
        <el-form-item label="資料型態">
          <el-select v-model="userType" placeholder="请选择">
            <el-option v-for="item in userTypeOption" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="帳號">
          <el-input placeholder="请输入内容" v-model="query.username" class="input-with-select" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="統編/證件號碼">
          <el-input placeholder="请输入内容" v-model="query.identity" class="input-with-select" clearable>
          </el-input>
        </el-form-item>
        <el-form-item class="btnBlock">
          <el-button type="primary" @click="getInfo">查詢</el-button>
          <el-button @click="init">清除</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <consumer :dataList=dataList v-if="userType === 'C'"> </consumer>
    <hotel :dataList=dataList v-if="userType === 'H'"> </hotel>
    <store :dataList=dataList v-if="userType === 'S'"> </store>

  </div>
</template>


<script>
  var options = require('@/assets/js/options.js');
  import loadingPage from '@/views/tool/loading/LoadingPage';
  import consumer from './ConsumerTable';
  import hotel from './HotelTable';
  import store from './StoreTable';
  import {
    getUserProfile
  } from "@/api/CustomerService/basic";

  export default {
    name: "BasicInfoQuery",
    components: {
      loadingPage,
      consumer,
      hotel,
      store
    },
    data() {
      return {
        loadingText: null,
        userType: "S",
        query: {},
        dataList: [],
        userTypeOption: options.userType
      }
    },
    methods: {
      init() {
        var vi = this;
        vi.query = {
          username: null,
          identity: null
        };
        vi.dataList = [];
        vi.resetForm("query");
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
      getInfo() {
        var vi = this;
        if (vi.queryParamValid()) {
          vi.loadingText = '搜尋中';
          getUserProfile(vi.userType, vi.query.username, vi.query.identity).then(res => {
            vi.loadingText = null;
            if (!vi.getValue(res.result))
              vi.createWarm("查無資料");
          }).catch(error => {
            vi.loadingText = null;
          });
        }
      },
      getValue(result) {
        var vi = this;
        if (vi.userType === "C" && vi.checkResponseValue(result, "consumer"))
        {          
          vi.dataList = vi.convertDataToArray(result.consumer);
          return true;
        }

        if (vi.userType === "S" && vi.checkResponseValue(result, "store"))
        {          
          vi.dataList = vi.convertDataToArray(result.store);
          return true;
        }
          
        if (vi.userType === "H" && vi.checkResponseValue(result, "hotel"))
        {          
          vi.dataList = vi.convertDataToArray(result.hotel);
          return true;
        }

          return false;
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
          this.init();
        }
      }
    }
  };

</script>
