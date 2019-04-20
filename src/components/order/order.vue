<template>
  <div>
    <home-header v-show="!isGetData"></home-header>
    <div class="mui-content mui-row mui-fullscreen" style="top:45px;background:#fff" v-if="isGetData">
      <div class="mui-col-xs-3 bg-white" style="background:#ecebeb">
        <div
          id="segmentedControls"
          class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical"
        >
          <a
            class="mui-control-item Set-Width"
            :data-index="i"
            :href="'#content'+(i+1)"
            v-for="(item,i) in list"
            :key="i"
          >{{item.name}}</a>
        </div>
      </div>
      <div id="segmentedControlContents" class="mui-col-xs-9">
        <div :id="'content'+(u+1)" class="mui-control-content" v-for="(item,u) in list" :key="u">
          <div class="goods-title">///&nbsp;{{item.name}}&nbsp;///</div>
          <div class="flex" v-for="(n ,i) in item.goodsList" :key="i">
            <div class="icon">
              <img
                src="http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114"
                alt
                width="77"
                height="77"
                class="goods-img"
              >
            </div>
            <div class="flex-cart" @click="GetIndex">
              <div class="test">
                <h4 class="title">{{n.name}}</h4>
              </div>
              <div class="price money">${{n.amount}}</div>
              <!-- -->
              <div v-if="n.hasOwnProperty('specificationInfoList')==false" class="nav-btn">
                <img
                  src="../../img/del.png"
                  :data-nid="i"
                  :data-lid="item.id"
                  @click="minCount"
                  v-show="n.num>0"
                  class="transform cart-btn"
                >
                <span
                  style="font-size:12px;padding-left: 0.5rem;padding-right: 0.5rem;"
                  v-show="n.num>0"
                >{{n.num}}</span>
                <img src="../../img/add.png" id="FlyBill" :data-pid="item.id" @click="addCount(i)">
              </div>
              <div v-if="n.hasOwnProperty('specificationInfoList')" class="spec-box">
                <div class="spec" @click="specpopup" :data-lid="u" :data-nid="i">选规格</div>
              </div>
            </div>
          </div>
        </div>
        <div style="height:2.5rem"></div>
      </div>
    </div>
    <div class="shopcart disabled" v-if="isGetData">
      <!--底部悬浮div-->
      <div class="content">
        <div class="content-left" @click="toggleList()">
          <div class="logo-wrapper">
            <div class="logo" style="line-height: 2.5rem;">
              <i class="layui-icon layui-icon-cart d-target" style="font-size:25px;"></i>
            </div>
            <div class="num" style="display: none;">{{Count}}</div>
          </div>
          <div class="price">${{price.toFixed(2)}}</div>
          <div class="desc"></div>
        </div>
        <div class="content-right">
          <div
            class="pay"
            @click="orderConfirm()"
          >{{this.$store.getters.GetIsAddOrder==true?'加单':'去下单'}}</div>
        </div>
      </div>
    </div>
    <!--购物车弹窗-->
    <mt-popup
      v-if="Count>0"
      v-model="popupVisible"
      position="bottom"
      style="width:100%;z-index:2019;margin-bottom:2.8rem;border-top-left-radius: 12px;border-top-right-radius: 12px;"
    >
      <!--购物车内容-->
      <div class="flex Space-between ShopCart-height">
        <div>购物车</div>
        <div class="mui-icon mui-icon-trash">
          <span class="clear font-red" @click="empty()">清空</span>
        </div>
      </div>
      <div class="list-content">
        <ul>
          <li class="food border-1px" v-for="(item,i) in ShopCartList" :key="i">
            <div class="inline-block">{{item.name}}</div>
            <div class="inline-block list-float-right">
              <span class="font-red">${{item.amount}}</span>
              <div
                class="mui-icon mui-icon-minus cart-btn padding"
                @click="ShopCartMin"
                :data-lid="item.id"
                :data-nid="i"
              ></div>
              <span class="ShopCart-num">{{item.num}}</span>
              <div
                class="mui-icon mui-icon-plus cart-btn padding"
                @click="ShopCartAdd"
                :data-pid="i"
              ></div>

              <!-- <img src="../../img/del.png" @click="ShopCartMin" :data-lid="item.id" :data-nid="i" class="transform cart-btn">
                        <span style="font-size:12px;padding-left: 0.5rem;padding-right: 0.5rem;" v-show="n.num>0">{{item.num}}</span>
              <img src="../../img/add.png" @click="ShopCartAdd" :data-pid="i">-->
            </div>
          </li>
        </ul>
      </div>
    </mt-popup>
    <!-- 选规格弹窗 -->
    <mt-popup v-model="spec" popup-transition="popup-fade" class="spec-pop">
      <div class="spec-title">
        <div>&nbsp;</div>
        <div class="spec-title-name">{{specItem[0].name}}</div>
        <span class="mui-icon mui-icon-closeempty spec-title-icon" @click="CloseSpec"></span>
      </div>
      <div class="spec-type">
        <span class="spec-type-font">酸辣味:</span>
      </div>
      <div class="spec-select">
        <div class="spec-item">
          <span class="spec-item-font">酸辣味</span>
        </div>
        <div class="spec-item spec-item-active">
          <span class="spec-item-font">火锅味</span>
        </div>
        <div class="spec-item">
          <span class="spec-item-font">香辣味</span>
        </div>
        <div class="spec-item">
          <span class="spec-item-font">天蝎味</span>
        </div>
      </div>
      <div>&nbsp;</div>

      <div class="spec-bottom">
        <div class="spec-bottom-left">
          <span style="color:red">¥</span>
          <span class="spec-price">12</span>
          <span class="spec-bottom-font">(酸辣味)</span>
        </div>
        <div class="spec-bottom-right" @click="addSpecCount">
          <span class="spec-bottom-icon">+</span>
          <span class="spec-bottom-fonts">加入购物车</span>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<style>
.font-red{
    color: red
}
.mui-active{
    background: #fff !important
}
.mui-control-content{
    background: #fff;
}
.goods-img {
  height: 100%;
  width: 100%;
  border-radius: 3px;
}

#segmentedControlContents {
  padding-left: 8px;
  padding-right: 8px;
}

.mui-content {
  background: #f2f2f2;
}

.ShopCart-num {
  font-size: 12px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  position: relative;
  left: 0.5rem;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.test {
  /* position: absolute; */
}

.nav-btn {
  position: absolute;
  /* left: 4.5rem; */
  /* top: 1rem; */
  bottom: 0.5rem;
  right: 0.5rem;
}

.ShopCart-height {
  height: 1.5rem !important;
  padding: 1rem !important;
}

.bg-white {
  background: #fff;
}

.money {
  /* position: relative;
    top: 1rem; */
}

.spec-item-active {
  background: #3bc5e6;
  color: white !important;
}

.outer {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 0px;
  top: 0px;
  transition: all 0.35s linear;
}

.outer .inner {
  width: 30px;
  height: 30px;
  background: red;
  border-radius: 50%;
  transition: all 0.35s cubic-bezier(0.39, -0.4, 0.83, 0.23);
  position: absolute;
}

.outer.point-pre {
  display: none;
}

.spec-bottom-fonts {
  position: relative;
  left: 0.3rem;
}

.spec-title-name {
  position: relative;
  left: 1.3rem;
}

.spec-title-icon {
  line-height: inherit !important;
  font-size: 40px !important;
}

.spec-item-font {
  font-size: 15px;
}

.spec-bottom-icon {
  font-size: 28px;
  position: relative;
  top: 0.2rem;
  right: 0.3rem;
}

.spec-type-font {
  font-size: 1rem;
  padding: 5px;
  padding-left: 0;
}

.spec-bottom-right {
  position: relative;
  right: 1rem;
  color: black;
  background: #efc259;
  height: 2.2rem;
  border-radius: 15px;
  width: 9rem;
  line-height: 1.8rem;
  text-align: center;
}

.spec-bottom-left {
  position: relative;
  left: 1rem;
  line-height: 2.1rem;
}

.spec-bottom-font {
  font-size: 1rem;
  padding: 10px;
}

.spec-price {
  font-size: 1.6rem;
  color: red;
}

.spec-bottom {
  position: relative;
  bottom: 0.6rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.spec-item {
  border: 1px solid #3bc5e6;
  width: 21.2%;
  height: 38px;
  line-height: 38px;
  font-size: 16px;
  text-align: center;
  color: #3bc5e6;
  margin: 10px;
  margin-right: 0;
}

.spec-select {
  display: flex;
  display: -webkit-box;
  flex-flow: row wrap;
  margin: 0 0 0.8rem 0;
  justify-content: space-around;
}

.spec-type {
  position: relative;
  left: 0.8rem;
}

.spec-title {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 3rem;
  font-size: 1.2rem;
  line-height: 3rem;
}

.spec-pop {
  width: 90%;
  height: 37%;
  border-radius: 10px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
}

.spec-box {
  display: -ms-inline-flexbox;
  font-size: 12px;
  -ms-flex-align: center;
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
}

.spec {
  text-align: center;
  background: #fd2c2c;
  border-radius: 14px;
  height: 24px;
  font-size: 12px;
  line-height: 24px;
  padding-right: 10px;
  padding-left: 10px;
  color: #fff;
}
.mui-active {
  border-left: 2px solid red !important;
}

.mui-control-item {
  border-bottom: 0px !important;
}

.food {
  position: relative;
  padding: 12px 0;
  box-sizing: border-box;
  position: relative;
  height: 48px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}

.padding {
  padding: 0 6px;
}

.list-float-right {
  float: right;
}

.inline-block {
  display: inline-block;
}

ul {
  list-style: none;
  padding: 0;
}

.list-content {
  padding: 0 18px;
  padding-bottom: 25px;
  background: #fff;
  max-height: 300px;
  overflow: hidden;
  overflow-y: auto;
}

.goods-title {
  padding-left: 14px;
  /* height: 40px; */
  /* line-height: 40px; */
  font-size: 14px;
  color: #55585a;
  /* border-left: 2px solid #ed5b5b; */
  /* background-color: #f3f0f0; */
  text-align: center;
  color: #fd2c2c;
  /* background: #fff; */
  padding: 1rem;
}

.clear {
  font-size: 1rem;
}

.Space-between {
  margin: 1.1rem 0 0 0 !important;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  padding: 0 18px;
  background: #f3f5f7 !important;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  display: flex;
  align-items: center;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
}

.flex {
  height: 5.6rem;
  /* padding: 0.8rem; */
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-flow: row nowrap;
  flex-flow: row nowrap;
  /* border-bottom: 0.5px solid #ccc; */
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  /* background: #dad5d559; */
  margin-bottom: 10px;
  border-radius: 3px;
  /* border: 1px solid #cccccc; */
  /* box-shadow: 1px 1px 1px 1px #cccccc; */
  box-shadow: 0 0 6px #ccc;
}

.title {
  margin: 2px 0 8px;
  line-height: 14px;
  font-size: 14px;
  color: #07111b;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.type {
  line-height: 12px;
  margin-bottom: 8px;
  font-size: 10px;
  color: #93999f;
}

.price {
  color: red;
  position: absolute;
  bottom: 0.5rem;
}

.icon {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 57px;
  flex: 0 0 90px;
  margin-right: 10px;
  height: 5.6rem;
  width: 100%;
  border-radius: 3px;
}

.cart-btn {
  width: 21px;
}

.flex-cart {
  display: -ms-flexbox;
  -ms-flex-align: center;
  -ms-flex-flow: row nowrap;
  height: 5.6rem;
  padding: 0.5rem;
  padding-left: 0;
  -ms-flex-pack: justify;
  position: relative;
  width: 100%;
}

.transform {
  animation: rotating 0.8s linear forwards;
  -moz-animation: rotating 0.8s linear forwards;
  /* Firefox */
  -webkit-animation: rotating 0.8s linear forwards;
  /* Safari and Chrome */
  -o-animation: rotating 0.8s linear forwards;
  /* Opera */
}

@keyframes rotating {
  from {
    transform: translateX(-45px) rotate(0deg);
    transform-origin: center;
    opacity: 0;
  }

  to {
    transform: translateX(0px) rotate(360deg);
    transform-origin: center;
    opacity: 1;
  }
}

.shopcart.disabled .content {
  color: #ffffff;
  background: #cccccc;
}

.shopcart .content .content-left .logo-wrapper .num {
  position: absolute;
  top: 0;
  right: -5px;
  /* width: 20px; */
  /* height: 20px; */
  /* line-height: 14px; */
  text-align: center;
  border-radius: 100%;
  font-size: 14px;
  font-weight: 700;
  color: #fff !important;
  background-color: #ef2020e0 !important;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  min-width: 20px;
  min-height: 20px;
}

/* .activeIcon {
    background: white;
    color: red;
} */

.shopcart .shopcart-list.mui-active {
  transform: translate3d(0, -100%, 0);
}

.shopcart .content .content-right .pay {
  line-height: 48px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
}

.shopcart .content .content-right {
  -ms-flex: 0 0 105px;
  flex: 0 0 105px;
  width: 105px;
}

.shopcart.disabled .content .content-right {
  background: #989696;
}

.shopcart .content .content-left .desc {
  display: inline-block;
  vertical-align: top;
  margin: 12px 0 0 12px;
  line-height: 24px;
  font-size: 12px;
}

.shopcart .content .content-left .price {
  display: inline-block;
  vertical-align: top;
  line-height: 24px;
  margin-top: 12px;
  padding-right: 12px;
  /* border-right: 1px solid rgba(255, 255, 255, 0.1); */
  font-size: 18px;
  font-weight: 700;
}

.shopcart.disabled .content .content-left .price {
  color: #3e3838;
}

.icon-shopping_cart:before {
  content: "\E907";
}

.shopcart .content .content-left .logo-wrapper .logo .icon-shopping_cart {
  line-height: 44px;
  font-size: 30px;
  color: #ffffff;
}

.shopcart .content .content-left .logo-wrapper .logo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.shopcart .content .content-left .logo-wrapper {
  display: inline-block;
  position: relative;
  top: -20px;
  margin: 0 12px;
  padding: 6px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  box-sizing: border-box;
  vertical-align: top;
  text-align: center;
}

.shopcart.disabled .content .content-left .logo-wrapper {
  background: #989696;
}

.shopcart .content .content-left {
  -ms-flex-positive: 1;
  flex-grow: 1;
  font-size: 0;
}

.shopcart .content {
  display: -ms-flexbox;
  display: flex;
  height: 100%;
}

.shopcart {
  position: fixed;
  z-index: 9999;
  /*低于2005会出现被遮罩层遮住的问题*/
  left: 0;
  bottom: 0;
  width: 100%;
  height: 46px;
  background: #ccc;
  box-shadow: 0 -2px 3px -1px #cccccc;
}

.mui-row.mui-fullscreen > [class*="mui-col-"] {
  height: 100%;
}

.mui-col-xs-3,
.mui-col-xs-9 {
  overflow-y: auto;
  height: 100%;
}

.mui-segmented-control .mui-control-item {
  line-height: 50px !important;
  width: 100%;
}

.mui-control-content {
  display: block !important;
}

.mui-segmented-control.mui-segmented-control-inverted
  .mui-control-item.mui-active {
  background-color: #fff;
}

.Set-Width {
  width: 100% !important;
}

.Set-display {
  display: block !important;
}
</style>

<script>
//引入过渡组件，正常情况该组建应设为全局组件
import HomeHeader from "@/components/transition/trans";
export default {
  components: {
    HomeHeader
  },
  data() {
    return {
      //选择菜品规格的弹窗控制开关
      spec: false,
      //控制购物车的弹出
      popupVisible: false,
      //菜单页左侧的菜品
      //注:数组里放一个空的对象,让初始化的dom不会报错,并不影响数组结果
      list: [{}],
      //菜单栏右侧的循环数组
      Count: 0,
      //购物车商品列表
      ShopCartList: [],
      //用于保存菜单数组的索引
      Item: -1,
      //存放所有选中的菜品,  后面会做过滤去重
      basket: [],
      //存放总价
      price: 0,
      //存放弹窗选中商品的总价
      SpecPrice: 0,
      //存放弹窗选中的商品
      SpecList: [],
      //临时保存一个选规格商品的数据,给一个空的name,让数据渲染出来不至于报错
      specItem: [(name = "")],
      //用于判断数据是否获取到
      isGetData: false
    };
  },
  methods: {
    //点击选规格里的按钮
    addSpecCount() {
      console.log(2);
    },
    //关闭选规格
    CloseSpec() {
      this.spec = !this.spec;
    },
    //购物车添加按钮
    ShopCartAdd(e) {
      this.Count++;
      //e.target.dataset.pid在ShopCartList数组的索引
      let pid = e.target.dataset.pid;
      this.ShopCartList[pid].num++;
      this.basket.unshift(this.ShopCartList[pid]);
    },
    //购物车删除按钮
    ShopCartMin(e) {
      this.Count--;
      let nid = e.target.dataset.nid;
      this.ShopCartList[nid];
      let status = 0;
      for (var i = 0; i < this.basket.length; i++) {
        if (
          this.basket[i].id == this.ShopCartList[e.target.dataset.nid].id &&
          status == 0
        ) {
          this.basket[i].num--;
          this.basket.splice(i, 1);
          status++;
        }
      }
    },
    //按id过滤basket数组,
    basketFilter() {
      this.ShopCartList = [];
      var str = [];
      for (var i = 0; i < this.basket.length; i++) {
        //将所有选中菜品的id放进数据,用GoMore进行去重
        str.push(this.basket[i].id);
      }
      var length = this.GoMore(str);
      for (var i = 0; i < length.length; i++) {
        var id = length[i];
        var tmp;
        //拿到id进来，若找到一个对应id相等的数据，则保存该id的对象
        for (var item of this.basket) {
          if (item.id == id) {
            tmp = item;
          }
        }
        //将符合条件的菜品，加入数据，一会儿在购物车显示
        this.ShopCartList.push(tmp);
      }
    },
    //去重方法
    GoMore(array) {
      var temp = [];
      var index = [];
      var l = array.length;
      for (var i = 0; i < l; i++) {
        for (var j = i + 1; j < l; j++) {
          if (array[i] === array[j]) {
            i++;
            j = i;
          }
        }
        temp.push(array[i]);
        index.push(i);
      }
      return temp;
    },
    //利用事件冒泡,获取到菜系里菜单的index
    GetIndex(e) {
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].id == e.target.dataset.pid) {
          //rows  存储了每类商品的菜品
          var rows = this.list[i];
          rows.goodsList[this.Item].num++;
          this.basket.push(rows.goodsList[this.Item]);
        }
      }
    },
    //页面初始化 获取数据  组件创建后触发一次
    LoadMore() {
      var rows = [];
      var items = {};
      var qr_num = "";
      var url = "https://api.hantepay.cn/mobi/store/goods/list?qr_num=HawyZ0pW";
      this.axios
        .post(url, {
          headers: "application/json"
        })
        .then(result => {
          this.list = result.data.categoryList;
          //数据获取到后,关闭过渡组件
          this.isGetData = true;
          //给每个菜系的菜品都强行赋值一个num属性,用于点菜
          for (var item of this.list) {
            item.goodsList[0].specificationInfoList = true;
            for (var row of item.goodsList) {
              row.num = 0;
            }
          }
          console.log(this.list);
        });
    },
    //控制购物车模态窗的显示  两层控制 这里控制开关  另外一处在购物车图标右上角的Count上
    toggleList() {
      if (this.Count > 0) {
        this.popupVisible = !this.popupVisible;
      }
    },
    //点击选规格
    specpopup(e) {
      this.spec = !this.spec;
      this.specItem = [];
      var lid = e.target.dataset.lid;
      var nid = e.target.dataset.nid;
      var item = this.list[lid].goodsList[nid];
      this.specItem.push(item);
      console.log(this.specItem[0]);
    },
    //去掉一个商品,当购物车里商品总数量等于0时，更改购物栏的样式
    minCount(e) {
      this.Count--; //购物车数量减1
      //存储this.basket数组里商品的id
      var CartId;
      //存储商品在this.basket数组里的索引
      var d;
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].id == e.target.dataset.lid) {
          var rows = this.list[i];
          //rows.goodsList[e.target.dataset.nid].num--;
          //要删除的商品的id
          CartId = rows.goodsList[e.target.dataset.nid].id;
          //去this.basket数组里,去做减法运算
          for (var j = 0; j < this.basket.length; j++) {
            //如果 对比选择减去菜品的id和basket里的那个id对应,减去对应菜品的num--
            if (this.basket[j].id == CartId) {
              //获取菜品的在basket的下标索引
              d = j;
            }
          }
        }
      }
      /* console.log(CartId);
                                                            //点击删除的菜品id与数据里,那一项的id符合 */
      //当num<=0时,删除掉指定id的商品
      if (this.basket[d].num > 0) {
        this.basket[d].num--;
        this.basket.splice(d, 1); //从删除的下标位置,删除一个对象
        //console.log(d,this.basket[d],2,this.basket)
      }
      //当购物车里的商品数量为0的时候，改变样式
    },
    //添加商品 当商品数量大于0的时候,修改下方购物栏的样式
    addCount(index) {
      this.Count++;
      //保存当前添加商品在所属类的索引
      this.Item = index;
      //ShopCart 顶层div
      var div = document.getElementsByClassName("shopcart")[0];
      //ShopCart 左侧内容
      var contentleft = document.getElementsByClassName("content-left")[0];
      //ShopCart 左侧内容 的图标
      var i = document.getElementsByClassName("logo-wrapper")[0];
      //ShopCart 左侧内容 的图标右上角的数字角标
      var num = document.getElementsByClassName("num")[0];
      //ShopCart 右侧内容
      var contentRight = document.getElementsByClassName("content-right")[0];
      //购物车商品数量大于0时
      if (this.Count >= 0) {
        //当商品数量大于0的时候
        contentRight.style.background = "red";
        num.style.display = "block";
        i.style.background = "red";
        contentleft.style.background = "white";
      }
    },
    //初始化菜单两栏的数据
    init() {
      //配合watch实现 在获取到初始化数据后,在指令执行完毕后,确保是最新的dom,再执行原声dom操作
      this.$nextTick(function() {
        /*DOM更新了*/
        //默认选中第一个
        var controls = document.getElementById("segmentedControls");
        var contents = document.getElementById("segmentedControlContents");
        controls.querySelector(".mui-control-item").classList.add("mui-active");
        (function() {
          var controlsElem = document.getElementById("segmentedControls");
          var contentsElem = document.getElementById(
            "segmentedControlContents"
          );
          var controlListElem = controlsElem.querySelectorAll(
            ".mui-control-item"
          );
          var contentListElem = contentsElem.querySelectorAll(
            ".mui-control-content"
          );
          var controlWrapperElem = controlsElem.parentNode;
          var controlWrapperHeight = controlWrapperElem.offsetHeight;
          var controlMaxScroll =
            controlWrapperElem.scrollHeight - controlWrapperHeight; //左侧类别最大可滚动高度
          var maxScroll = contentsElem.scrollHeight - contentsElem.offsetHeight; //右侧内容最大可滚动高度
          var controlHeight = controlListElem[0].offsetHeight; //左侧类别每一项的高度
          var controlTops = []; //存储control的scrollTop值
          var contentTops = [0]; //存储content的scrollTop值
          var length = contentListElem.length;
          for (var i = 0; i < controlListElem.length; i++) {
            controlTops.push(controlListElem[i].offsetTop + controlHeight);
          }
          for (var i = 1; i < length; i++) {
            var offsetTop = contentListElem[i].offsetTop;
            if (offsetTop + 100 >= maxScroll) {
              var height = Math.max(offsetTop + 100 - maxScroll, 100);
              var totalHeight = 0;
              var heights = [];
              for (var j = i; j < length; j++) {
                var offsetHeight = contentListElem[j].offsetHeight;
                totalHeight += offsetHeight;
                heights.push(totalHeight);
              }
              for (var m = 0, len = heights.length; m < len; m++) {
                contentTops.push(
                  parseInt(
                    maxScroll - (height - (heights[m] / totalHeight) * height)
                  )
                );
              }
              break;
            } else {
              contentTops.push(parseInt(offsetTop));
            }
          }
          contentsElem.addEventListener("scroll", function() {
            var scrollTop = contentsElem.scrollTop;
            for (var i = 0; i < length; i++) {
              var offsetTop = contentTops[i];
              var offset = Math.abs(offsetTop - scrollTop);
              /* console.log(
                                                                                                                                              "i:" +
                                                                                                                                                i +
                                                                                                                                                ",scrollTop:" +
                                                                                                                                                scrollTop +
                                                                                                                                                ",offsetTop:" +
                                                                                                                                                offsetTop +
                                                                                                                                                ",offset:" +
                                                                                                                                                offset
                                                                                                                                            ); */
              if (scrollTop < offsetTop) {
                if (scrollTop >= maxScroll) {
                  onScroll(length - 1);
                } else {
                  onScroll(i - 1);
                }
                break;
              } else if (offset < 20) {
                onScroll(i);
                break;
              } else if (scrollTop >= maxScroll) {
                onScroll(length - 1);
                break;
              }
            }
          });
          var lastIndex = 0;
          //监听content滚动
          var onScroll = function(index) {
            if (lastIndex !== index) {
              lastIndex = index;
              var lastActiveElem = controlsElem.querySelector(".mui-active");
              lastActiveElem && lastActiveElem.classList.remove("mui-active");
              var currentElem = controlsElem.querySelector(
                ".mui-control-item:nth-child(" + (index + 1) + ")"
              );
              currentElem.classList.add("mui-active");
              //简单处理左侧分类滚动，要么滚动到底，要么滚动到顶
              var controlScrollTop = controlWrapperElem.scrollTop;
              if (
                controlScrollTop + controlWrapperHeight <
                controlTops[index]
              ) {
                controlWrapperElem.scrollTop = controlMaxScroll;
              } else if (
                controlScrollTop >
                controlTops[index] - controlHeight
              ) {
                controlWrapperElem.scrollTop = 0;
              }
            }
          };
          //滚动到指定content
          var scrollTo = function(index) {
            /* console.log(index); */
            contentsElem.scrollTop = contentTops[index];
          };
          mui(controlsElem).on("tap", ".mui-control-item", function(e) {
            scrollTo(this.getAttribute("data-index"));
            return false;
          });
        })();
      });
    },
    //点击去下单
    //ShopCartList数组获取暂时放在这里
    orderConfirm() {
      if (this.Count > 0) {
        //修改全局菜单列表  先做UI
        console.log(this.ShopCartList, this.price);
        this.$store.commit("initMenuList", this.ShopCartList);
        this.$store.commit("updatePath", this.$route.path);
        this.$router.push("/transition");
      }
    },
    //计算总价
    calcTocalPrice(index) {
      //console.log(index, this.Item, this.basket, this.basket.length);
      var sum = 0;
      if (this.ShopCartList.length > 0) {
        for (var i = 0; i < this.ShopCartList.length; i++) {
          sum += this.basket[i].num * this.basket[i].amount;
        }
        this.price = sum;
      }
    }
  },
  created() {
    this.LoadMore();
  },
  mounted: function() {},
  watch: {
    list: {
      //watch配合以下代码,可实现在数据改变后,指令执行后,执行dom操作
      /* this.$nextTick(function(){}) */
      handler: function(newVal, oldVal) {
        this.init();
      }
    },
    //basket数组变化,就计算price
    basket: {
      handler: function(newVal, oldVal) {
        //计算price
        let sum = 0;
        for (var i = 0; i < this.list.length; i++) {
          var list = this.list[i];
          for (var j = 0; j < list.goodsList.length; j++) {
            var gooditem = list.goodsList[j];
            sum += gooditem.num * gooditem.amount;
          }
        }
        this.price = sum;

        //basket数组一旦变化,就对数组去重后赋值给ShopCartList数组,用于显示购物车弹窗
        this.basketFilter();
      }
    },
    //当Count值变化是,根据条件改变显示样式
    Count: {
      handler: function() {
        //当购物车里的商品数量为0的时候，改变样式
        if (this.Count == 0) {
          //关闭弹窗
          this.popupVisible = false;
          //ShopCart 左侧内容 的图标
          var i = document.getElementsByClassName("logo-wrapper")[0];
          //ShopCart 左侧内容 的图标右上角的数字角标
          var num = document.getElementsByClassName("num")[0];
          //ShopCart 右侧内容
          var contentRight = document.getElementsByClassName(
            "content-right"
          )[0];
          //ShopCart 左侧内容
          var contentleft = document.getElementsByClassName("content-left")[0];
          contentleft.style.background = "#ccc";
          num.style.display = "none";
          i.style.background = "#989696";
          contentRight.style.background = "#989696";
        }
      }
    }
  },
  computed: {
    /* fullName: function() {
                                          return this.firstName + this.lastName;
                                        } */
  }
};
</script>
