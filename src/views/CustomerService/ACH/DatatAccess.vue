<template>
  <div>
    <loadingPage :loadingText="loadingText"></loadingPage>
    <el-card>
      <div slot="header" class="clearfix">
        <span>ACH檔案上傳、下載</span>
      </div>

      <el-form status-icon class="queryBlock" size="mini" :model="query" ref="query">
        <el-form-item label="功能">
          <el-select v-model="action" placeholder="请选择">
            <el-option v-for="item in actionType" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="檔案類型">
          <el-select v-model="query.fileType" placeholder="请选择" :disabled="queryDisable">
            <el-option v-for="item in fileType" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <div v-if="action === '1'">
          <el-form-item label="檔案日期">
            <el-date-picker v-model="query.queryDate" type="date" placeholder="選擇日期" :disabled="queryDisable">
            </el-date-picker>
          </el-form-item>
        </div>

        <div class="uploadBlock" v-if="action === '0'">
          <div class="el-form-item__label">
            <label class="importBtn">
              <input type="file" @click="init" @change="selectFile" id="excelfile" style="display:none;" />
              瀏覽..
            </label>
          </div>
          <el-input class="textInput" placeholder="尚未選擇檔案" v-model="file.name" readonly></el-input>
        </div>

        <el-form-item class="btnBlock">
          <el-button type="primary" @click="getFile" v-if="action === '1'" :disabled="queryDisable">查詢</el-button>
          <el-button type="primary" @click="uploadFile" v-if="action === '0'" :disabled="queryDisable">上傳</el-button>
          <el-button @click="init" type="danger">清除</el-button>
        </el-form-item>
      </el-form>

    </el-card>

    <el-card v-if="action === '1'">
      <div slot="header" class="clearfix">
        <span>上傳紀錄</span>
      </div>
      <el-table :data="fileList" border style="width: 100%" empty-text="暫無資料">
        <el-table-column type="index" width="40">
        </el-table-column>
        <el-table-column prop="fileName" label="檔案名稱" sortable>
        </el-table-column>
        <el-table-column width="70" label="下載" align="center" >
          <template slot-scope="scope">
            <el-button @click="createFile(scope.row)" type="text" size="medium" icon="el-icon-download"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>


<script>
  import $ from 'jquery';
  var options = require('@/assets/js/options.js');
  import loadingPage from '@/views/tool/loading/LoadingPage';
  import * as fileSaver from "file-saver";
  import {
    getFileList,
    downloadFile,
    uploadFile
  } from "@/api/CustomerService/ach";
  import {
  Notification
} from 'element-ui'

  export default {
    name: "ACHDataAccess",
    components: {
      loadingPage
    },
    data() {
      return {
        loadingText: null,
        action: "0",
        file: {},
        fileList: [],
        fileType: options.fileType,
        actionType: options.dataActionType,
        total: 2,
        query: {},
        queryDisable: false
      }
    },
    methods: {
      init() {
        var vi = this;
        vi.file = {};
        vi.fileList = [];
        vi.query = {
          fileType: "0",
          queryDate: null
        };
        vi.queryDisable = false;
      },
      selectFile() {
        var vi = this;
        vi.file = $("#excelfile")[0].files[0];
      },
      uploadFile() {
        var vi = this;
        if(!vi.file)
          vi.createWarm("請至少輸入一個查詢條件");

        let formData = new FormData();
        formData.append('fileType', '0');
        formData.append('file', this.file);

        vi.loadingText = '上傳中';
        uploadFile(formData).then(res => {
          vi.loadingText = null;
          Notification.success({
            title: "檔案上傳完成"
          })
          vi.init();
        }).catch(error => {
          vi.loadingText = null;
        });
      },
      createFile(row) {
        var vi = this;
        vi.loadingText = '下載中';
        downloadFile(row.fileName, vi.query.fileType).then(data => {
          vi.loadingText = null;

          var blob = new Blob([data], {
            type: "text/plain;charset=utf-8"
          });

          fileSaver.saveAs(blob, row.fileName);
        }).catch(error => {
          vi.loadingText = null;
        });
      },
      getFile() {
        var vi = this;
        vi.loadingText = '搜尋中';
        getFileList(vi.query.queryDate, vi.query.fileType).then(res => {
          vi.loadingText = null;
          if (vi.checkResponseValue(res.result, "fileInfo")) {
            vi.fileList = vi.convertDataToArray(res.result.fileInfo);
            vi.queryDisable = true;
          } else
            vi.createWarm("查無資料");
        }).catch(error => {
          vi.loadingText = null;
        });
      }
    },
    mounted() {
      this.init();
    },
    watch: {
      action: {
        deep: true,
        immediate: true,
        handler(val) {
          this.init();
        }
      }
    }
  };

</script>
