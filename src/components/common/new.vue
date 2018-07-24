<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="点餐" name="first">
      <bill-table :tableData="selectGoods" @addBill="addBillTable" @deleteBill="deleteBillTable" ></bill-table>
    </el-tab-pane>
    <el-tab-pane label="挂单" name="second">挂单</el-tab-pane>
    <el-tab-pane label="外卖" name="third">外卖</el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { setData } from "../../common/js/productData";
import billTable from './billTable'
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  computed: {
    ...mapGetters(["selectGoods"])
  },
  methods: {
    // 挂单
    billstate() {
      if (this.selectGoods.length > 0) {
        console.log("挂单");

      } else {
        this.$message({
          showClose: true,
          message: "警告哦，您还没有商品哦！",
          type: "warning"
        });
      }
    },
    // 删除
    billdelete() {
      if (this.selectGoods.length > 0) {
        console.log("删除");
        this.changeSelectGoods([]);
      } else {
        this.$message({
          showClose: true,
          message: "警告哦，您还没有商品哦！",
          type: "warning"
        });
      }
    },
    // 结账
    billend() {
      let totalMoney = 0;
      for (let i = 0, len = this.selectGoods.length; i < len; i++) {
        totalMoney += this.selectGoods[i].price;
      }
      this.$confirm(`需要支付的金额是${totalMoney}元`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "去付款成功!"
          });
          this.changeSelectGoods([]);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消付款"
          });
        });
    },
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
    // 账单删除一行
    deleteBillTable(row) {
      let oldGoodArr =
        this.selectGoods && this.selectGoods.length > 0
          ? JSON.parse(JSON.stringify(this.selectGoods))
          : [];
      let newArr = [];
      let r = setData(oldGoodArr, row, "goodsId");
      if (r) {
        oldGoodArr.splice(r.index, 1);
        newArr = oldGoodArr;
      }
      console.log(newArr);
      this.changeSelectGoods(newArr);
    },
    addBillTable(row) {
      let oldGoodArr =
        this.selectGoods && this.selectGoods.length > 0
          ? JSON.parse(JSON.stringify(this.selectGoods))
          : [];
      let newArr = [];
      let r = setData(oldGoodArr, row, "goodsId");
      if (r) {
        oldGoodArr[r.index].number++;
        oldGoodArr[r.index].price =
          oldGoodArr[r.index].number * oldGoodArr[r.index].unitPrice;
        newArr = oldGoodArr;
      }
      console.log(newArr);
      this.changeSelectGoods(newArr);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    ...mapMutations({
      changeSelectGoods: "CHANGE_SELECTGOODS"
    })
  },
  components: {
    billTable
  }
};
</script>
<style scoped>
.el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar {
  height: 2px;
}
.btns {
  margin: 10px 0;
  text-align: center;
}
</style>
