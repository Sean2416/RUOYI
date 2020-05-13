<template>
  <div>
    <el-table :data="dataList" style="width: 100%" empty-text="暫無資料">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="消費店家名稱" class="table-expand-item">
              <span>{{ props.row.storeName }}</span>
            </el-form-item>
            <el-form-item label="消費店家類型" class="table-expand-item">
              <span>{{ props.row.storeTypeLabel}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="抵用券序號" prop="couponId">
      </el-table-column>
      <el-table-column label="抵用券金額" prop="amount">
      </el-table-column>
      <el-table-column label="消費時間" prop="consumeTime">
      </el-table-column>
      <el-table-column label="是否使用" prop="isUsedLabel">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import $ from 'jquery';
  var options = require('@/assets/js/options.js');

  export default {
    name: "CustomerInfo",
    props: {
      dataList: {
        type: Array,
        required: true,
        default: []
      }
    },
    data() {
      return {
        options: options,
      }
    },
    watch: {
      dataList: {
        deep: true,
        immediate: true,
        handler(val) {
          var vi = this;
          vi.dataList.forEach(element => {
            element.storeTypeLabel  =  vi.convertStoreType(element.storeType);             
            let usedType = $.grep(vi.options.usedType, function (r) {
              return r.value == element.isUsed;
            })
            if(usedType.length > 0)
             element.isUsedLabel = usedType[0].label;

          });
        }
      }
    }
  };

</script>
