import vue from "vue"
import Router from "vue-router"
import Home from "./components/Home/Home.vue"
import order from "./components/order/order.vue"
import NotFound from "./components/404/NotFound.vue"
import Details from "./components/details/details.vue"
import Bill from "./components/bill/bill.vue"
import transition from './components/transition/transition'
vue.use(Router)
export default new Router({
    routes: [
        { path: '/', redirect: "Home" },
        { path: '/Home', component: Home },
        { path: '/order', component: order },
        { path: '/details', component: Details },
        { path: '/bill', component: Bill },
        { path: '/transition', component: transition },
        { path: '*', component: NotFound },
    ]
})