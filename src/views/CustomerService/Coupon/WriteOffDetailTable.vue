<template>
  <div>
    <loadingPage :loadingText="loadingText"></loadingPage>
    <el-table :data="deatilList" style="width: 100%" empty-text="暫無資料">
      <el-table-column label="消費時間" prop="consumeTime">
      </el-table-column>
      <el-table-column label="抵用券金額" prop="amount">
      </el-table-column>
      <el-table-column label="店家類型" prop="typeName">
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParam.page" :limit.sync="queryParam.limit"
        @pagination="getDetail" />

  </div>
</template>

<script>
  import loadingPage from '@/views/tool/loading/LoadingPage';
  import {
    getweeklyTxDtl
  } from "@/api/customerService/payment";

  export default {
    name: "CustomerInfo",
    components: {
      loadingPage
    },
    props: {
      isDialogVisible: {
        type: Boolean,
        default: false
      },
      userName: {
        type: String,
        required: true,
        default:  {}
      },
      weekData: {
        type: Object,
        required: true,
        default: {}
      }
    },
    data() {
      return {
        queryParam: {},
        deatilList: [],
        total: 0,
        loadingText: null
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        var vi = this;
        vi.queryParam = {
          limit: 1,
          page: 10
        };
        vi.total=0;
        vi.deatilList = [];
        vi.loadingText = null;
      },
      getDetail(val) {
        var vi = this;
        vi.loadingText = '搜尋中';
        getweeklyTxDtl(vi.userName, vi.weekData.weeklyTxId, val.limit.toString(), val.page.toString())
          .then(res => {
            vi.loadingText = null;
            if (vi.checkResponseValue(res.result, "weeklyTxDtl")) {
                vi.total = res.result.totalRecords;
              vi.deatilList = vi.convertDataToArray(res.result.weeklyTxDtl);
              vi.setColumnLabel();
            }
          }).catch(error => {
            vi.loadingText = null;
          });
      },
      setColumnLabel() {
        var vi = this;
        vi.deatilList.forEach(element => {
          element.typeName = vi.convertStoreType(element.storeType);
        });
      },
    },
    watch: {
      weekData: {
        deep: true,
        immediate: true,
        handler(val) {
          this.init();
          if (this.isDialogVisible)
            this.getDetail(this.queryParam);
        }
      }
    }
  };

</script>
