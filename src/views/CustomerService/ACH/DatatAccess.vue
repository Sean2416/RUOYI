<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>ACH檔案上傳、下載</span>
      </div>

      <el-form status-icon class="queryBlock" size="mini" :model="query" ref="query">
        <el-form-item label="功能">
          <el-select v-model="query.action" placeholder="请选择">
            <el-option v-for="item in actionType" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="檔案類型">
          <el-select v-model="query.fileType" placeholder="请选择">
            <el-option v-for="item in fileType" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <div v-if="query.action === '1'">
          <el-form-item label="檔案日期">
            <el-date-picker v-model="query.queryDate" type="date" placeholder="選擇日期">
            </el-date-picker>
          </el-form-item>
        </div>

        <div class="uploadBlock" v-if="query.action === '0'">
          <div class="el-form-item__label">
            <label class="importBtn">
              <input type="file" @click="init" @change="selectFile" id="excelfile" style="display:none;" />
              瀏覽..
            </label>          
          </div>
          <el-input class="textInput" placeholder="尚未選擇檔案" v-model="file.name" readonly></el-input>
        </div>

        <el-form-item class="btnBlock">
          <el-button type="primary" @click="getFileList" v-if="query.action === '1'">查詢</el-button>
          <el-button type="primary" @click="getFileList" v-if="query.action === '0'">上傳</el-button>
          <el-button @click="init">清除</el-button>
        </el-form-item>
      </el-form>

    </el-card>

    <el-card class="detailCard" v-if="query.action === '1'">
      <el-table :data="fileList" border style="width: 100%" empty-text="暫無資料">
        <el-table-column type="index" width="40">
        </el-table-column>
        <el-table-column prop="fileName" label="檔案名稱" sortable>
        </el-table-column>
        <el-table-column prop="date" label="檔案日期" sortable>
        </el-table-column>
        <el-table-column width="70" label="下載" style="text-align: center">
          <template slot-scope="scope">
            <el-button @click="downLoad(scope.row)" type="text" size="medium" icon="el-icon-download"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" />

    </el-card>

  </div>
</template>


<script>
  var options = require('@/assets/js/options.js');
  import $ from 'jquery';

  export default {
    name: "ACHDataAccess",
    data() {
      return {
        query: {},
        file: {},
        fileList: [],
        fileType: options.fileType,
        actionType: options.dataActionType,
        total: 2,
        queryParams: {
          pageNum: 1,
          pageSize: 10
        },
      }
    },
    methods: {
      init() {
        var vi = this;
        vi.file = {};
        vi.fileList = [];
        vi.query = {
          action: "0",
          fileType: "0",
          queryDate: vi.getDate(0)
        };
      },
      selectFile() {
        var vi = this;
        vi.file = $("#excelfile")[0].files[0];
      },
      downLoad(row) {
        // /file/downloadFile
        alert(row.fileName);
      },
      getFileList() {
        //API /file/getFileList
        var vi = this;
        vi.fileList = [{
            "date": "2020/05/14",
            "fileName": "achCheck20200601rq.txt"
          },
          {
            "date": "2020/05/13",
            "fileName": "achCheck20200602rq.txt"
          },
          {
            "date": "2020/05/12",
            "fileName": "achCheck20200603rq.txt"
          }
        ]
      }
    },
    mounted() {
      this.init();
    },
    watch: {}
  };

</script>
