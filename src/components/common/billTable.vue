<template>
  <div class="billTable">
    <el-table
        show-summary
        :summary-method="getSummaries"
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
        prop="goodsName"
        label="商品"
        width="100">
      </el-table-column>
      <el-table-column
        prop="number"
        label="量"
        width="40">
      </el-table-column>
      <el-table-column
        prop="price"
        label="金额"
        width="60">
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        width="100">
        <template slot-scope="scope">
            <el-button  @click="addBillTable(scope.row)" type="text" size="small">增加</el-button>
            <el-button  @click="deleteBillTable(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: []
    }
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        }
      });

      return sums;
    },
    addBillTable(row) {
      this.$emit("addBill", row);
    },
    deleteBillTable(row) {
      this.$emit("deleteBill", row);
    }
  }
};
</script>
<style scoped>
</style>

