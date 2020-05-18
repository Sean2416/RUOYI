<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>旅宿資料</span>
        <el-button style="float: right; margin-right:10px" type="primary" plain @click="showOnMap()"
          icon="el-icon-map-location"></el-button>
      </div>
      <el-form class="showInfo">
        <el-form-item label="帳號">
          <el-input v-model="hotelData.username" readonly></el-input>
        </el-form-item>
        <el-form-item label="旅宿名稱">
          <el-input v-model="hotelData.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="統編">
          <el-input v-model="hotelData.businessNo" readonly></el-input>
        </el-form-item>
        <el-form-item label="旅宿地址">
          <el-input v-model="hotelData.address" readonly></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "HotelInfo",
    props: {
      hotelData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {}
    }
  };

</script>
