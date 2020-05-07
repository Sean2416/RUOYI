<template>
  <div class="dashboard-editor-container">

    <el-row >
      <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect"
        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="1">白名單查詢</el-menu-item>
        <el-menu-item index="2">抵用券狀態查詢</el-menu-item>
        <el-menu-item index="3">消費者/店家基本資料查詢</el-menu-item>
        <el-menu-item index="4">消費紀錄查詢</el-menu-item>
        <el-menu-item index="5">收款紀錄查詢</el-menu-item>
        <el-menu-item index="6">抵用券核銷查詢</el-menu-item>
        <el-menu-item index="7">ACH上傳、下載</el-menu-item>
      </el-menu>
    </el-row>


    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
  import PanelGroup from './dashboard/PanelGroup'
  import LineChart from './dashboard/LineChart'
  import RaddarChart from './dashboard/RaddarChart'
  import PieChart from './dashboard/PieChart'
  import BarChart from './dashboard/BarChart'

  const lineChartData = {
    newVisitis: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    messages: {
      expectedData: [200, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
      expectedData: [80, 100, 121, 104, 105, 90, 100],
      actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130]
    }
  }

  export default {
    name: 'Index',
    components: {
      PanelGroup,
      LineChart,
      RaddarChart,
      PieChart,
      BarChart
    },
    data() {
      return {
        lineChartData: lineChartData.newVisitis
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key==1)
        if(key==1)
          this.$router.push({ path: '/whiteList/query' })
        if(key==2)
          this.$router.push({ path: '/whiteList/info' })
        if(key==3)
          this.$router.push({ path: '/StoreQuery' })
        if(key==4)
          this.$router.push({ path: '/StoreQuery' })
        if(key==5)
          this.$router.push({ path: '/StoreQuery' })
        if(key==6)
          this.$router.push({ path: '/StoreQuery' })
        if(key==7)
          this.$router.push({ path: '/StoreQuery' })
      },
      handleSetLineChartData(type) {
        this.lineChartData = lineChartData[type]
      }
    }
  }

</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }

</style>
