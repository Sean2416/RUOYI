<template>
  <div>
        <el-card>
      <div slot="header" class="clearfix">
        <span>旅宿資料</span>
      </div>
      <el-table :data="dataList" border style="width: 100%" empty-text="暫無資料">
        <el-table-column width="50" align="center" label="地圖">
          <template slot-scope="scope">
            <el-button @click="showOnMap(scope.row)" type="text" size="medium" icon="el-icon-map-location"></el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="旅宿名稱" sortable>
        </el-table-column>
        <el-table-column prop="username" label="帳號" sortable>
        </el-table-column>
        <el-table-column prop="businessNo" label="統編" sortable>
        </el-table-column>
        <el-table-column prop="address" label="旅宿地址" sortable>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
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
      return {}
    },
    methods: {
    },
  };

</script>
