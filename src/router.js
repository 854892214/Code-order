import vue from "vue"
import Router from "vue-router"
import Home from "./components/Home/Home.vue"
import order from "./components/order/order.vue"
import NotFound from "./components/404/NotFound.vue"
vue.use(Router)
export default new Router({
    routes: [
        { path: '/', redirect: "Home" },
        { path: '/Home', component: Home },
        { path: '/order', component: order },
        { path: '*', component: NotFound },
    ]
})