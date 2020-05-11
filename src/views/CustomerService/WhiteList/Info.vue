<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>白名單資料</span>
        <el-button style="float: right; margin-right:10px" type="primary" plain @click="ShowOnMap()"
          icon="el-icon-map-location"></el-button>
      </div>
      <el-form class="showInfo">
        <el-form-item label="名稱">
          <el-input v-model="storeData.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="統編">
          <el-input v-model="storeData.tax_no" readonly></el-input>
        </el-form-item>
        <el-form-item label="負責人">
          <el-input v-model="storeData.owner" readonly></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="storeData.address" readonly></el-input>
        </el-form-item>
        <el-form-item label="電話">
          <el-input v-model="storeData.phonenumber" readonly></el-input>
        </el-form-item>
        <el-form-item label="電子信箱">
          <el-input v-model="storeData.email" readonly></el-input>
        </el-form-item>
        <el-form-item label="消費場所註記">
          <el-input v-model="storeData.store_name_mk" readonly></el-input>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>


<script>
  export default {
    name: "WhiteListInfo",
    props: {
      storeData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {}
    },
    methods: {
      ShowOnMap()
      {
        window.open("https://www.google.com/maps/search/?api=1&query=" + this.storeData.latitude + "," + this.storeData.longitude);
      }
    },
  };

</script>
