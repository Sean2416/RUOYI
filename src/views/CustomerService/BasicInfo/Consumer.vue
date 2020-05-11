<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>消費者資料</span>
      </div>
      <el-form class="showInfo">
        <el-form-item label="帳號">
          <el-input v-model="user.username" readonly></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="user.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="身分證">
          <el-input v-model="user.identity" readonly></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-input v-model="user.birthday" readonly></el-input>
        </el-form-item>
        <el-form-item label="手機號碼">
          <el-input v-model="user.mobile" readonly></el-input>
        </el-form-item>
        <el-form-item label="電子信箱">
          <el-input v-model="user.email" readonly></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>


<script>
  export default {
    name: "ConsumerInfo",
    props: {
      user: {
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
