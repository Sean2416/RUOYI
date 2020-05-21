<template>
  <div>
    <loadingPage :loadingText="loadingText"></loadingPage>
    <el-card>
      <div slot="header" class="clearfix">
        <span>白名單查詢</span>
      </div>
      <el-form size="mini" status-icon class="queryBlock" :model="query" :rules="rules" ref="query">
        <el-form-item label="資料型態">
          <el-select :disabled="queryDisable" v-model="query.whitelistType" placeholder="请选择">
            <el-option v-for="item in whitelistType" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="統編/證號" prop="identity">
          <el-input :disabled="queryDisable" v-model="query.identity" class="input-with-select" clearable>
          </el-input>
        </el-form-item>
        <el-form-item class="btnBlock">
          <el-button type="primary" @click="getStoreInfo" :disabled="queryDisable">查詢</el-button>
          <el-button @click="init" type="danger">清除</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <div slot="header" class="clearfix">
        <span>白名單清單</span>
      </div>

      <el-table :data="whiteListInfoList" border style="width: 100%" empty-text="暫無資料">
        <el-table-column label="地圖" width="50" align="center">
          <template slot-scope="scope">
            <el-button @click="showOnMap(scope.row)" type="text" size="medium" icon="el-icon-map-location"></el-button>
          </template>
        </el-table-column>
        <el-table-column type="expand" label="明細">
          <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="負責人" class="table-expand-item">
                <span>{{ props.row.owner }}</span>
              </el-form-item>
              <el-form-item label="電子信箱" class="table-expand-item">
                <span>{{ props.row.email}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名稱" sortable>
        </el-table-column>
        <el-table-column prop="taxNo" label="統編/證號" sortable>
        </el-table-column>
        <el-table-column prop="phonenumber" label="電話	" sortable>
        </el-table-column>
        <el-table-column prop="address" label="地址	" sortable>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>


<script>
  var options = require('@/assets/js/options.js');
  import loadingPage from '@/views/tool/loading/LoadingPage';
  import {
    getWhiteListInfo
  } from "@/api/customerService/whiteList";
  export default {
    name: "WhiteListQuery",
    components: {
      loadingPage
    },
    data() {
      return {
        loadingText: null,
        queryDisable: false,
        store: {},
        dialogDetail: false,
        query: {},
        whiteListInfoList: [],
        whitelistType: options.whitelistType,
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
          whitelistType: 'S'
        };
        vi.dialogDetail = false;
        vi.store = {};
        vi.whiteListInfoList = [];
        vi.resetForm("query");
        vi.queryDisable = false;
      },
      getStoreInfo() {
        var vi = this;

        vi.$refs["query"].validate((valid) => {
          if (valid) {
            vi.loadingText = '搜尋中';
            getWhiteListInfo(vi.query.whitelistType, vi.query.identity).then(res => {
              vi.loadingText = null;
              if (vi.checkResponseValue(res.result, "whiteListInfo")) {
                vi.whiteListInfoList = vi.convertDataToArray(res.result.whiteListInfo);
                vi.queryDisable = true;
              } else
                vi.createWarm("查無資料");
            }).catch(error => {
              vi.loadingText = null;
            });
          }
        });
      }
    },
  };

</script>
