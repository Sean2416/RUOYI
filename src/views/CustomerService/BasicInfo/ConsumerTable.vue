<template>
  <div>
        <el-card>
      <div slot="header" class="clearfix">
        <span>消費者資料</span>
      </div>
      <el-table :data="dataList" border style="width: 100%" empty-text="暫無資料">
        <el-table-column type="expand"  label="明細">
          <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="生日" class="table-expand-item">
                <span>{{ props.row.birthday }}</span>
              </el-form-item>
              <el-form-item label="電子信箱" class="table-expand-item">
                <span>{{ props.row.email}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" sortable>
        </el-table-column>
        <el-table-column prop="username" label="帳號" sortable>
        </el-table-column>
        <el-table-column prop="identity" label="身分證" sortable>
        </el-table-column>
        <el-table-column prop="mobile" label="手機號碼" sortable>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "ConsumerInfo",
    props: {
      dataList: {
        type: Array,
        required: true,
        default: []
      }
    },
    data() {
      return {}
    },
    methods: {},
  };

</script>
