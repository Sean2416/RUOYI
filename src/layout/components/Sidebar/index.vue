<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu default-active="0" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#3e4554"
        text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">白名單查詢</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">抵用券狀態查詢</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-menu"></i>
          <span slot="title"> 基本資料查詢</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-menu"></i>
          <span slot="title"> 消費紀錄查詢</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-menu"></i>
          <span slot="title"> 收款紀錄查詢</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-menu"></i>
          <span slot="title"> 抵用券核銷查詢</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-menu"></i>
          <span slot="title"> ACH檔案處理</span>
        </el-menu-item>

      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import Logo from './Logo'
  import SidebarItem from './SidebarItem'
  import variables from '@/assets/styles/variables.scss'

  export default {
    components: {
      SidebarItem,
      Logo
    },
    data() {
      return {};
    },
    methods: {
      handleSelect(key, keyPath) {
        if (key == 1)
          this.$router.push({
            path: '/whiteList/query'
          })
        if (key == 2)
          this.$router.push({
            path: '/coupon/consumerQuery'
          })
        if (key == 3)
          this.$router.push({
            path: '/basicInfo/query'
          })
        if (key == 4)
          this.$router.push({
            path: '/coupon/consumptionHistory'
          })
        if (key == 5)
          this.$router.push({
            path: '/coupon/chargeHistory'
          })
        if (key == 6)
          this.$router.push({
            path: '/coupon/writeOffHistory'
          })
        if (key == 7)
          this.$router.push({
            path: '/ACH/datatAccess'
          })
      },
    },
    computed: {
      ...mapGetters([
        //'permission_routes',
        'sidebar'
      ]),
      showLogo() {
        return this.$store.state.settings.sidebarLogo
      },
      variables() {
        return variables
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }

</script>
