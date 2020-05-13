<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>消費者資料</span>
      </div>
      <el-form class="showInfo">
        <el-form-item label="帳號">
          <el-input v-model="userData.username" readonly></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="userData.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="身分證">
          <el-input v-model="userData.identity" readonly></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-input v-model="userData.birthday" readonly></el-input>
        </el-form-item>
        <el-form-item label="手機號碼">
          <el-input v-model="userData.mobile" readonly></el-input>
        </el-form-item>
        <el-form-item label="電子信箱">
          <el-input v-model="userData.email" readonly></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "ConsumerInfo",
    props: {
      userData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {}
    },
    methods: {},
  };

</script>
