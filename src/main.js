import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import Vuex from "vuex"
//1:引入mint-ui 样式文件
import "mint-ui/lib/style.min.css"
//1:引入mui 样式文件
import "./lib/mui/css/mui.min.css"
import "./lib/mui/css/icons-extra.css"
import { Popup, MessageBox, Spinner } from 'mint-ui';
//阻止启动生产消息
Vue.config.productionTip = false
Vue.use(Vuex)
var store = new Vuex.Store({
  state: {
    //点菜页面的ShopCartList,传入Details页面
    menuList: sessionStorage.getItem('menuList'),
    //购物车的商品数
    CartCount: sessionStorage.getItem('Count') || 0,
    //存储当前组件的路由
    NowPath: sessionStorage.getItem('NowPath') || null,
    //存储点击返回时的当前组件路由
    backPath: sessionStorage.getItem('backPath') || null,
    //存储加单状态
    isAddOrder: sessionStorage.getItem('isAddOrder') || false,
    //EndList 加单后商品放入这里
    EndList: [],
    //EndList数组模式
    EndLists: []
  },
  mutations: {
    initMenuList(state, list) {
      state.menuList = list
      sessionStorage.setItem('menuList', list)
    },
    updateCount(state, count) {
      state.CartCount = count
      sessionStorage.setItem("CartCount", count)
    },
    updatePath(state, NowPath) {
      state.NowPath = NowPath
      sessionStorage.setItem("NowPath", NowPath)
    },
    callbackPath(state, backPath) {
      state.backPath = backPath
      sessionStorage.setItem("backPath", backPath)
    },
    updateIsAddOrder(state, isAddOrder) {
      state.isAddOrder = isAddOrder
      sessionStorage.setItem("isAddOrder", isAddOrder)
    },
    //全局修改EndList
    updateEndList(state, EndList) {
      state.EndList = []
      for (let item of EndList) {
        state.EndList.push(item)
      }
    },
    //全局修改EndLists
    updateEndLists(state, EndLists) {
      state.EndLists = EndLists
      for(let item of EndLists){
        state.EndLists.push(item)
      }
      sessionStorage.setItem("EndLists", EndLists)
    }
  },
  getters: {
    GetShopCartList: function (state) {
      return state.menuList
    },
    GetPath: function (state) {
      return state.NowPath
    },
    GetbackPath: function (state) {
      return state.backPath
    },
    GetIsAddOrder: function (state) {
      if (state.isAddOrder == 'false') {
        return false
      }
      if (state.isAddOrder == 'true') {
        return true
      }
      return Boolean(state.isAddOrder)
    },
    GetEndList: function (state) {
      return state.EndList
    },
    GetEndLists: function (state) {
      return state.EndLists
    },
  }
})

import qs from "qs"
import axios from "axios"
Vue.prototype.axios = axios;
Vue.prototype.qs = qs;
//配置跨域保存Session
axios.defaults.withCredentials = true;
Vue.component(Popup.name, Popup);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Spinner.name, Spinner);
Vue.filter("datetimeFilter", function (val) {
  var date = new Date(val);
  var y = date.getFullYear();
  var m = date.getMonth();
  var d = date.getDay();
  var h = date.getHours();
  var mi = date.getMinutes();
  var s = date.getSeconds();
  m < 10 && (m = "0" + m);
  d < 10 && (d = "0" + d);
  return `${y}-${m}-${d} ${h}:${mi}:${s}`;
})

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app');