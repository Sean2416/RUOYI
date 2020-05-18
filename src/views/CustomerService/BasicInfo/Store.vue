<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>店家資料</span>
        <el-button style="float: right; margin-right:10px" type="primary" plain @click="showOnMap()"
          icon="el-icon-map-location"></el-button>
      </div>
      <el-form class="showInfo">
        <el-form-item label="帳號">
          <el-input v-model="storeData.username" readonly></el-input>
        </el-form-item>
        <el-form-item label="店家名稱">
          <el-input v-model="storeData.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="店家類型">
          <el-input v-model="storeData.storeTypeLabel" readonly></el-input>
        </el-form-item>
        <el-form-item label="統編">
          <el-input v-model="storeData.businessNo" readonly></el-input>
        </el-form-item>
        <el-form-item label="商家地址">
          <el-input v-model="storeData.address" readonly></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import $ from 'jquery';
  var options = require('@/assets/js/options.js');

  export default {
    name: "StoreInfo",
    props: {
      storeData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        storeType: options.storeType
      }
    },
    methods: {
    },
    watch: {
      storeData: {
        deep: true,
        immediate: true,
        handler(val) {
          var vi = this;

          let type = $.grep(vi.storeType, function (r) {
            return r.value == vi.storeData.type;
          })
          if (type.length > 0)
            vi.storeData.storeTypeLabel = type[0].label;
        }
      }
    },
  };

</script>
