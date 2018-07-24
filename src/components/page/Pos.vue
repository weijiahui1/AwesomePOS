<template>
    <div class="pos">
      <el-container>
        <!-- <el-aside style="width: 60px">
            <left-nav></left-nav>
        </el-aside> -->
        <el-main>
            <el-col :span="6">
              <tab-operation></tab-operation>
            </el-col>
            <el-col :span="18" class="other">
              <product-list></product-list>
            </el-col>
        </el-main>
      </el-container>
    </div>
</template>
<script>
import leftNav from "@/components/common/leftNav";
import tabOperation from "@/components/common/tabOperation";
import productList from "@/components/common/productList";

export default {
  name: "Pos",
  components: {
    leftNav,
    tabOperation,
    productList
  }
};
</script>
<style scoped>
.pos {
  height: 100%;
}
.el-container {
  height: 100%;
}
.pos .el-main {
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
}
.other {
  height: 100%;
  background-color:#eff2f7; 
  border-left: 1px solid #d3dce6;
}
</style>
