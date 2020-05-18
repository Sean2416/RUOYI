<template>
  <div>
    <el-card tyle="margin-bottom: 20px!important;">
      <div slot="header" class="clearfix">
        <span>店家資料</span>
      </div>
      <el-table :data="dataList" border style="width: 100%" empty-text="暫無資料">
        <el-table-column width="50" align="center" label="地圖">
          <template slot-scope="scope">
            <el-button @click="showOnMap(scope.row)" type="text" size="medium" icon="el-icon-map-location"></el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="店家名稱" sortable>
        </el-table-column>
        <el-table-column prop="storeTypeLabel" label="店家類型" sortable>
        </el-table-column>
        <el-table-column prop="username" label="帳號" sortable>
        </el-table-column>
        <el-table-column prop="owner" label="負責人" sortable>
        </el-table-column>
        <el-table-column prop="address" label="商家地址" sortable>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import $ from 'jquery';
  var options = require('@/assets/js/options.js');
  export default {
    name: "ConsumerInfo",
    props: {
      dataList: {
        type: Array,
        required: true,
        default: []
      }
    },
    data() {
      return {
        options: options,
      }
    },
    methods: {
    },
    watch: {
      dataList: {
        deep: true,
        immediate: true,
        handler(val) {
          var vi = this;
          vi.dataList.forEach(element => {
            element.storeTypeLabel = vi.convertStoreType(element.type);
          });
        }
      }
    },
  };

</script>
