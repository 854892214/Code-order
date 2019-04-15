import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import Vuex from "vuex"
//1:引入mint-ui 样式文件
import "mint-ui/lib/style.min.css"
//1:引入mui 样式文件
import "./lib/mui/css/mui.min.css"
import "./lib/mui/css/icons-extra.css"
import { Popup, MessageBox,Spinner } from 'mint-ui';
//阻止启动生产消息
Vue.config.productionTip = false
Vue.use(Vuex)
var store = new Vuex.Store({
  state: {
    //点菜页面的ShopCartList
    menuList: sessionStorage.getItem('menuList'),
    //购物车的商品数
    CartCount: sessionStorage.getItem('Count') || 0
  },
  mutations: {
    initMenuList(state, list) {
      state.menuList = list
      sessionStorage.setItem('menuList', list)
    },
    updateCount(state, count) {
      state.CartCount = count
      sessionStorage.setItem("CartCount", count)
    }
  },
  getters: {
    GetShopCartList: function (state) {
      return state.menuList
    }
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
new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app');