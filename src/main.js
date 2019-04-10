import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import Vuex from "vuex"
//1:引入mint-ui 样式文件
import "mint-ui/lib/style.min.css"
//1:引入mui 样式文件
import "./lib/mui/css/mui.min.css"
import "./lib/mui/css/icons-extra.css"
//阻止启动生产消息
Vue.config.productionTip = false
Vue.use(Vuex)
var store = new Vuex.Store({
})
import qs from "qs"
import axios from "axios"
Vue.prototype.axios = axios;
Vue.prototype.qs = qs;
//配置跨域保存Session
axios.defaults.withCredentials = true;
import { Popup } from 'mint-ui';
Vue.component(Popup.name, Popup);
new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app');