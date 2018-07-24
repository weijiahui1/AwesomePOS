<template>
  <div class="productlist">
      <div class="top">
        <el-row>
          <el-col :span="24">
            <div class="title">
              常用商品
            </div>
          </el-col>
        </el-row>
        <div class="oftenGood">
          <el-col v-for="oftenGood in oftenGoods" v-bind:key="oftenGood.goodsId" :span="5">
            <el-card  shadow="hover"  :body-style="{ padding: '10px' }">
              <div v-on:click="selectGood(oftenGood)">
                <span>{{oftenGood.goodsName}}</span>
                <span style="color:#409EFF">￥{{oftenGood.price}}元</span>
              </div>
            </el-card>
          </el-col>
        </div>
      </div>
    <el-row class="goodType">
      <el-col :span="24">
        <el-tabs v-model="activeName">
          <el-tab-pane label="汉堡" name="first">
            <div class="typeGoodsContentWrapper">
              <el-col v-for="type0Good in Hamburg" v-bind:key="type0Good.goodsId" :span="5">
                <el-card shadow="hover" :body-style="{ padding: '10px' }">
                    <div v-on:click="selectGood(type0Good)" class="typeGoodsContent">
                    <img v-bind:src="type0Good.goodsImg" alt="">
                    <div class="describe">
                      <span style="color:red">{{type0Good.goodsName}}</span><br/>
                      <span>￥{{type0Good.price}}元</span>
                    </div>
                    </div>
                </el-card>
              </el-col>
           </div>
          </el-tab-pane>
          <el-tab-pane label="小食" name="second">
            <div class="typeGoodsContentWrapper">
              <el-col v-for="type0Good in refreshments" v-bind:key="type0Good.goodsId" :span="5">
                <el-card shadow="hover" :body-style="{ padding: '10px' }">
                    <div v-on:click="selectGood(type0Good)" class="typeGoodsContent">
                    <img v-bind:src="type0Good.goodsImg" alt="">
                    <div class="describe">
                      <span style="color:red">{{type0Good.goodsName}}</span><br/>
                      <span>￥{{type0Good.price}}元</span>
                    </div>
                    </div>
                </el-card>
              </el-col>
           </div>
          </el-tab-pane>
          <el-tab-pane label="饮料" name="third">
            <div class="typeGoodsContentWrapper">
              <el-col v-for="type0Good in drink" v-bind:key="type0Good.goodsId" :span="5">
                <el-card shadow="hover" :body-style="{ padding: '10px' }">
                    <div v-on:click="selectGood(type0Good)" class="typeGoodsContent">
                    <img v-bind:src="type0Good.goodsImg" alt="">
                    <div class="describe">
                      <span style="color:red">{{type0Good.goodsName}}</span><br/>
                      <span>￥{{type0Good.price}}元</span>
                    </div>
                    </div>
                </el-card>
              </el-col>
           </div>
          </el-tab-pane>
          <el-tab-pane label="套餐" name="fourth">
            <div class="typeGoodsContentWrapper">
              <el-col v-for="type0Good in groupFood" v-bind:key="type0Good.goodsId" :span="5">
                <el-card shadow="hover" :body-style="{ padding: '10px' }">
                    <div v-on:click="selectGood(type0Good)" class="typeGoodsContent">
                    <img v-bind:src="type0Good.goodsImg" alt="">
                    <div class="describe">
                      <span style="color:red">{{type0Good.goodsName}}</span><br/>
                      <span>￥{{type0Good.price}}元</span>
                    </div>
                    </div>
                </el-card>
              </el-col>
           </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
import {setData} from '../../common/js/productData'
export default {
  name: "productlist",
  data() {
    return {
      activeName: "first",
      oftenGoods: [],
      Hamburg: [],
      refreshments: [],
      drink: [],
      groupFood: []
    };
  },
  created() {
    this._getOftenGoods();
    this._getTypeGoods();
  },
  methods: {
    selectGood(good) {
      good.unitPrice = good.price;
      let oldGoodArr = 
        this.oldGood && this.oldGood.length > 0
          ? JSON.parse(JSON.stringify(this.oldGood))
          : [];
      let newArr = [];
      if (oldGoodArr.length > 0) {
        let r = setData(oldGoodArr, good, "goodsId");
        if (r) {
          oldGoodArr[r.index].number++;
          oldGoodArr[r.index].price = oldGoodArr[r.index].number * oldGoodArr[r.index].unitPrice
          newArr = oldGoodArr;
        } else {
          good.number = 1;
          oldGoodArr.push(good);
          newArr = oldGoodArr;
        }
      } else {
        good.number = 1;
        newArr.push(good);
      }
      console.log(newArr);
      this.changeSelectGoods(newArr);
    },
    _getOftenGoods() {
      this.$http("get", "http://localhost:8080/static/json/oftenGoods.json")
        .then(res => {
          if (res.status == 200) {
            this.oftenGoods = res.data.data;
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    _getTypeGoods() {
      this.$http("get", "http://localhost:8080/static/json/typeGoods.json")
        .then(res => {
          if (res.status == 200) {
            this.Hamburg = res.data.data.Hamburg;
            this.refreshments = res.data.data.refreshments;
            this.drink = res.data.data.drink;
            this.groupFood = res.data.data.groupFood;
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    ...mapMutations({
      changeSelectGoods: "CHANGE_SELECTGOODS"
    })
  },
  computed: {
    ...mapGetters({
      oldGood: "selectGoods"
    })
  }
};
</script>
<style scoped>
.title {
  height: 20px;
  border-bottom: 1px solid #d3dce6;
  background-color: #f9fafc;
  padding: 10px;
}
.top {
  background: #f9fafc;
}
.oftenGood {
  padding: 20px;
  overflow: hidden;
}
.productlist .el-col-5 {
  margin: 5px;
}
.oftenGood .el-card__body span {
  font-size: 14px;
}

.goodType {
  border-top: 1px solid #d3dce6;
  background-color: #eff2f7;
}
.goodType .el-tabs__nav-scroll {
  padding-left: 10px;
}
.typeGoodsContentWrapper {
  padding: 20px;
  overflow: hidden;
}
.typeGoodsContent {
  display: flex;
}
.typeGoodsContent img {
  display: block;
  width: 60px;
  height: 60px;
}
.typeGoodsContent .describe {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  font-size: 14px;
}
</style>
