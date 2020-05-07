<template>
  <div>
    <el-card>

      <el-row :gutter="20">
        <el-col :span="10">
          <el-input v-model="storeData.name" disabled>
            <template slot="prepend">店家名稱</template>
          </el-input>
        </el-col>
        <el-col :span="10">
          <el-input v-model="storeData.taxNo" disabled>
            <template slot="prepend">統一編號</template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" plain @click="ShowOnMap()" icon="el-icon-map-location"></el-button>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="10">
          <el-input v-model="storeData.phonenumber" disabled>
            <template slot="prepend">電話</template>
          </el-input>
        </el-col>
        <el-col :span="10">
          <el-input v-model="storeData.address" disabled>
            <template slot="prepend">地址</template>
          </el-input>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="10">
          <el-input v-model="storeData.latitude" disabled>
            <template slot="prepend">經度</template>
          </el-input>
        </el-col>
        <el-col :span="10">
          <el-input v-model="storeData.longitude" disabled>
            <template slot="prepend">緯度</template>
          </el-input>
        </el-col>
      </el-row>

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
      return {
      }
    },
    methods: {
      ShowOnMap()
      {
        window.open("https://www.google.com/maps/search/?api=1&query=" + this.storeData.latitude + "," + this.storeData.longitude);
      }
    },
  };

</script>
