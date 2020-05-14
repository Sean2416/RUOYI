<template>
  <div>
    <el-table :data="deatilList" style="width: 100%" empty-text="暫無資料">
      <el-table-column label="消費時間" prop="consumeTime">
      </el-table-column>
      <el-table-column label="抵用券金額" prop="amount">
      </el-table-column>
      <el-table-column label="店家類型" prop="typeName">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "CustomerInfo",
    props: {
      weekData: {
        type: Object,
        required: true,
        default: {}
      }
    },
    data() {
      return {
        deatilList: [],
      }
    },
    methods: {
      getDetail(weeklyTxId) {
        // API /payment/weeklyTxDtl
        console.log(weeklyTxId)
        this.deatilList = [{
            "consumeTime": "2020/06/03 10:23:45",
            "amount": 50,
            "storeType": "1",
            "couponType": "E"
          },
          {
            "consumeTime": "2020/06/03 10:23:45",
            "amount": 50,
            "storeType": "1,3",
            "couponType": "E"
          }
        ];

        this.setColumnLabel();
      },
      setColumnLabel()
      {
        var vi = this;
        vi.deatilList.forEach(element => {
          element.typeName =  vi.convertStoreType(element.storeType);
        });       
      },     
    },
    watch: {
      weekData: {
        deep: true,
        immediate: true,
        handler(val) {
          this.getDetail(val.weeklyTxId)
        }
      }
    }
  };
</script>
