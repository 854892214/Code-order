<template>
  <div>
    <div class="mui-content mui-row mui-fullscreen" style="top:45px">
      <div class="mui-col-xs-3">
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
      <div
        id="segmentedControlContents"
        class="mui-col-xs-9"
        style="border-left: 1px solid #c8c7cc;"
      >
        <div :id="'content'+(i+1)" class="mui-control-content" v-for="(item,i) in list" :key="i">
          <div class="goods-title">{{item.name}}</div>
          <div class="flex" v-for="(n ,i) in item.goodsList" :key="i">
            <div class="icon">
              <img
                src="http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114"
                alt
                width="57"
                height="57"
              >
            </div>
            <div>
              <h4 class="title">{{n.name}}</h4>
              <h4 class="type">咸粥</h4>
              <h4 class="type">月销{{n.quantity}}份 好评率100%</h4>
              <h4 class="price">{{n.amount}}</h4>
            </div>
            <div class="flex-cart" @click="GetIndex">
              <div
                class="mui-icon mui-icon-minus cart-btn transform"
                v-if="n.num>0"
                @click="minCount"
                :data-lid="item.id"
                :data-nid="i"
              ></div>
              <span
                style="font-size:12px;padding-left: 0.5rem;padding-right: 0.5rem;"
                v-if="n.num>0"
              >{{n.num}}</span>
              <div class="mui-icon mui-icon-plus cart-btn" @click="addCount(i)" :data-pid="item.id"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shopcart disabled">
      <!--底部悬浮div-->
      <div class="content">
        <div class="content-left" @click="toggleList()">
          <div class="logo-wrapper">
            <div class="logo" style="line-height: 2.5rem;">
              <i class="layui-icon layui-icon-cart" style="font-size:25px;"></i>
            </div>
            <div class="num" style="display: none;">{{Count}}</div>
          </div>
          <div class="price">$0.00</div>
          <div class="desc"></div>
        </div>
        <div class="content-right">
          <div class="pay" @click="orderConfirm()">去下单</div>
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
      <div class="flex Space-between">
        <div>购物车</div>
        <div class="mui-icon mui-icon-trash">
          <span class="clear price" @click="empty()">清空</span>
        </div>
      </div>
      <div class="list-content">
        <ul>
          <li class="food border-1px" v-for="(item,i) in ShopCartList" :key="i">
            <div class="inline-block">{{item.name}}</div>
            <div class="inline-block list-float-right">
              <span class="price">${{item.amount}}</span>
              <div class="mui-icon mui-icon-minus cart-btn transform padding" @click="minCount(i)"></div>
              <span style="font-size:12px;padding-left: 0.5rem;padding-right: 0.5rem;">{{item.num}}</span>
              <div class="mui-icon mui-icon-plus cart-btn padding" @click="addCount(i)"></div>
            </div>
          </li>
        </ul>
      </div>
    </mt-popup>
  </div>
</template>
<style>
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
  height: 26px;
  line-height: 26px;
  font-size: 12px;
  color: #55585a;
  border-left: 2px solid #ed5b5b;
  background-color: #f3f0f0;
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
  background: #f3f5f7;
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
  margin: 13px;
  display: flex;
  flex-flow: row nowrap;
}

.title {
  margin: 2px 0 8px;
  line-height: 14px;
  font-size: 14px;
  color: #07111b;
  font-weight: 700;
}

.type {
  line-height: 12px;
  margin-bottom: 8px;
  font-size: 10px;
  color: #93999f;
}

.price {
  margin-right: 8px;
  font-size: 14px;
  color: red;
  line-height: 24px;
}

.icon {
  flex: 0 0 57px;
  margin-right: 10px;
}

.cart-btn {
  display: inline-block;
  line-height: 24px;
  font-size: 1rem !important;
  color: #00a0dc;
  transition: all 0.4s linear;
}

.flex-cart {
  /* display: flex;
            flex-flow: row nowrap; */
  margin: -1.1rem;
  position: relative;
  top: 5rem;
  right: 1rem;
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
    transform: translateX(45px) rotate(0deg);
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
  color: #fff;
  background: #ef2020e0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  min-width: 20px;
  min-height: 20px;
}
.activeIcon {
  background: white;
  color: red;
}
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
[class^="icon-"],
[class*=" icon-"] {
  font-family: "sell-icon" !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
  z-index: 9999; /*低于2005会出现被遮罩层遮住的问题*/
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
export default {
  data() {
    return {
      ary: ["主食", "鲜食", "奶茶"],
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
      //存放选中的菜品
      basket: [],
      //存放总价
      price: 0
    };
  },
  methods: {
    //按id过滤basket数组,
    basketFilter() {
      //this.ShopCartList.push=[]
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
          var rows = this.list[i];
          rows.goodsList[this.Item].num++;
          this.basket.push(rows.goodsList[this.Item]);
          console.log(this.basket);
        }
      }
    },
    //页面初始化 获取数据  组件创建后触发一次
    LoadMore() {
      var rows = [];
      var items = {};
      var url = "https://api.hantepay.cn/mobi/store/goods/list?qr_num=bxdHG3Sk";
      this.axios.post(url, { headers: "application/json" }).then(result => {
        this.list = result.data.categoryList;
        //console.log(this.list);
        //给每个菜系的菜品都强行赋值一个num属性,用于点菜
        for (var item of this.list) {
          for (var row of item.goodsList) {
            row.num = 0;
          }
        }
        console.log(this.list);
      });
    },
    //控制购物车模态窗的显示  两层控制 这里控制开关  另外一处在购物车图标右上角的Count上
    toggleList() {
      this.popupVisible = !this.popupVisible;
      var str = [];
      this.ShopCartList = [];
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
    empty() {},
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
              d = j;
            }
          }
        }
      }
      console.log(CartId);
      //点击删除的菜品id与数据里,那一项的id符合
      //当num>0时,num-1
      console.log(d);
      console.log(this.basket[d]);
      if (this.basket[d].num > 0) {
        this.basket[d].num--;
      }
      //当num<=0时,删除掉指定id的商品
      if (this.basket[d].num <= 0) {
        this.basket.splice(this.basket[d], 1);
      }
      //当购物车里的商品数量为0的时候，改变样式
      if (this.Count == 0) {
        //ShopCart 左侧内容 的图标
        var i = document.getElementsByClassName("logo-wrapper")[0];
        //ShopCart 左侧内容 的图标右上角的数字角标
        var num = document.getElementsByClassName("num")[0];
        //ShopCart 右侧内容
        var contentRight = document.getElementsByClassName("content-right")[0];
        //ShopCart 左侧内容
        var contentleft = document.getElementsByClassName("content-left")[0];
        contentleft.style.background = "#ccc";
        num.style.display = "none";
        i.style.background = "#989696";
        contentRight.style.background = "#989696";
      }
      /* if (this.Count == 0) {
        return;
      } */
    },
    //添加商品 当商品数量大于0的时候,修改下方购物栏的样式
    addCount(index) {
      this.Count++;
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
    //点击弹出购物车的额内容
    pop() {
      this.popupVisible = !this.popupVisible;
    },
    //点击去下单
    orderConfirm() {}
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
    /* price: {
      handler: function(newVal, oldVal) {}
    } */
  },
  computed: {
    fullName: function() {
      return this.firstName + this.lastName;
    }
  }
};
</script>

