<template>
<div class="mui-pages">
    <div id="billDetail" class="mui-page mui-page-center" v-show="isGetData==false">
        <div class="mui-page-content">
            <!-- 到店自取 -->
            <div class="store-info" style="margin-top: 3rem;">
                <div class="store-info-name">到店自取</div>
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell mui-media">
                        <a href="javascript:;">
                            <img class="mui-media-object mui-pull-left" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTUzODI5Mjg4ODUyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIxNDEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMTAxNC4wNzM3OTIgMzQ1LjcwMTQ4NmMtMC4wNzE2MzEtMC41NTE1NjItMC4xODExMjUtMS4wNjkzNTUtMC4yOTE2NDItMS41MDkzNzctMC40NDYxNjItMi4xNDU4NzMtMS4wMzc2MzItNC4yMTM5NzUtMS44ODI4ODMtNi4yMDIyNTlsLTg2LjUzNDg2NS0yMTUuNDE3MjExQzkxMC40MTM4OTcgNzguMDU2Nzc0IDg2OS4wMjUyNTUgNTAuNDAwOSA4MTYuOTc1ODA4IDUwLjQwMDlMMjA5LjU2ODg3OCA1MC40MDA5Yy01MS4wMiAwLTkwLjY2Njk3NiAyNy4xMzYwMzQtMTA1LjAzMTEyNSA3MC4wMzIwMDZMMTEuNTA1OTE3IDM0MC4yMzkwNzhjLTAuNDM4OTk4IDEuMjk2NTI5LTAuOTI0MDQ1IDMuMjExMTM1LTEuMzI5Mjc1IDUuMTcwNzY2LTYuNzU0ODQ0IDIwLjc0NjUxLTEwLjE1MDE3NCA0Mi4wNDU2MDUtMTAuMTUwMTc0IDYzLjQyMzQ5NSAwLjA3MjY1NSA3NS4yMDE3NDkgNDEuMzQ3NzEgMTQzLjg2NTU5NSAxMDcuNjE1OTk2IDE3OS4xMjM2MSAyNy4yODEzNDMgMTQuNjE4OTUyIDU5LjQzNTY3MSAyMi4wMDIxMDcgOTUuNTM3OTEzIDIyLjAwMjEwN2wwLjExMjU2NCAwYzYwLjU4NDg0My0wLjE0NTMwOSAxMTYuNjk2ODE2LTI2Ljc2MjUyNyAxNTQuOTQ1OTU1LTcyLjMyMzE4OSAzOC4wNTc3ODEgNDUuMTQ4MjY5IDkzLjczMDc1NSA3MS42MTgxMzEgMTU0LjIwMjAxMSA3MS45OTE2MzggNTkuOTkzMzcyLTAuNDQ2MTYyIDExNS40ODAxMDQtMjcuMDIyNDQ3IDE1My4zOTE1NTMtNzIuMTczNzg2IDM4LjI0NzA5MiA0NS41NTY1NjkgOTQuNDMyNzQzIDcyLjEwMTEzMSAxNTUuMzA5MjI4IDcyLjEwMTEzMSAzNi44NDkyNTYtMC4yMjAwMTEgNjkuNTU0MTIyLTcuOTM3Nzg2IDk3LjA5NTM4NS0yMy4wNzQ1MzEgNjUuMjcwNTYzLTM1LjYyNDM1OSAxMDUuNzY2ODgyLTEwNC4wMzM0MDEgMTA1LjczMzExMy0xNzguNDIyNjQ1QzEwMjQuMDA2MDAyIDM4Ni42NDQ5OTEgMTAyMC41MDIyMDEgMzY1LjIzMzMzMiAxMDE0LjA3Mzc5MiAzNDUuNzAxNDg2TDEwMTQuMDczNzkyIDM0NS43MDE0ODZ6TTc5OS4wMzUyMDQgMzgxLjY5OTM1MiAyMDguMzEyMjU4IDM4MS42OTkzNTJjLTIwLjM3NTA1IDAtMzYuOTE0NzQ4LTE2LjUzOTY5OC0zNi45MTQ3NDgtMzYuOTE5ODY0IDAtMjAuMzc0MDI2IDE2LjUzOTY5OC0zNi45MTM3MjQgMzYuOTE0NzQ4LTM2LjkxMzcyNGw1OTAuNzIyOTQ2IDBjMjAuNDEyOTEyIDAgMzYuOTExNjc4IDE2LjUzOTY5OCAzNi45MTE2NzggMzYuOTEzNzI0QzgzNS45NDY4ODIgMzY1LjE1OTY1NCA4MTkuNDQ4MTE2IDM4MS42OTkzNTIgNzk5LjAzNTIwNCAzODEuNjk5MzUyTDc5OS4wMzUyMDQgMzgxLjY5OTM1MnpNNzk5LjAzNTIwNCAzODEuNjk5MzUyIiBwLWlkPSIyMTQyIiBmaWxsPSIjRUQ1QjVCIj48L3BhdGg+PHBhdGggZD0iTTk0Ny40MzgxMzkgNjc3LjA3NTY2M2MwLTIwLjQxNTk4Mi0xNi40OTY3MTktMzYuOTEzNzI0LTM2LjkxODg0MS0zNi45MTM3MjQtMy44MDE1ODMgMC03LjIzMzc1MiAxLjA2OTM1NS0xMC42Njc5NjcgMi4xNzQ1MjZsMCAwYy0yNy4zNTYwNDUgMTAuODIwNDQtNjIuMzU1MTYzIDE2LjY1MDIxNS04OC43NDcyNTMgMTUuMjEyNDctNTguMTgzMTQ0LTMuMTAyNjY0LTEwMi41MjMwMDEtMTQuNjk1Ny0xNDUuMjMzNzU2LTUxLjA1ODg4Ni00Mi4xMjMzNzYgMzUuOTIzMTY0LTk1Ljg3NTYwNCA1Ni4zNzA4NjktMTUzLjA5ODg4NyA1Ni44OTA3MDgtNTguMDMzNzQxLTAuMzcxNDYtMTEyLjA4MjcyOC0xNC45MTc3NTgtMTU0LjQyNjExNS01MC45MDg0Ni00Mi42MDMzMDcgMzYuMzI0My05Ni45Nzk3NTIgNTQuMDA0OTg1LTE1NC45MDYwNDYgNTQuMDA0OTg1bC0wLjIyMTAzNCAwYy0zNS4zNjQ0MzkgMC01NS4yOTk0NjctNi43MTQ5MzUtODcuNDk0NzI3LTE4LjYwNTc1My0wLjg4NDEzNy0wLjQzODk5OC0xLjgwNjEzNS0wLjY2NTE0OS0yLjczMTIwNC0wLjk5MjYwNy0xLjU0OTI4Ni0wLjU5MDQ0OC0yLjczMjIyOC0wLjk5NjctNC4zMjAzOTktMS41ODgxNzEgMCAwLTUuMzEzMDA2LTAuOTIxOTk5LTguMjMwNDUyLTAuOTIxOTk5bC0wLjA3MzY3OCAwYy0yMC4zODAxNjYgMC0zNi44Nzk5NTUgMTYuNTcxNDIxLTM2Ljg0NjE4NiAzNi45OTA0NzJsMC4yNTg4OTYgMTk3LjgzODg1N2MwIDUyLjA1NTU4NiA0Mi40MTgwODkgOTQuMzk4OTczIDk0LjU4MTEyMiA5NC4zOTg5NzNsNjk0LjcxNTQxNS0wLjQ0NjE2MmM1Mi4wODgzMzItMC4xNDUzMDkgOTQuNDcyNjUyLTQyLjYwMzMwNyA5NC40NzI2NTItOTQuNjUyNzUzTDk0Ny40MzgxMzkgNjc3LjA3NTY2MyA5NDcuNDM4MTM5IDY3Ny4wNzU2NjN6TTk0Ny40MzgxMzkgNjc3LjA3NTY2MyIgcC1pZD0iMjE0MyIgZmlsbD0iI0VENUI1QiI+PC9wYXRoPjwvc3ZnPg==">
                            <div class="mui-media-body">
                                汉特商店
                                <p class="mui-ellipsis">武汉市洪山区创星汇科技园</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <!-- 没有下单显示的页面 -->
            <div class="order-cart-content" v-if="this.$store.getters.GetIsAddOrder==false">
                <div class="info">
                    <div class="detail_title">
                        <span>订单详情</span>
                        <div class="r" @click="goOrder">
                            <span>继续点餐</span>
                        </div>
                    </div>
                    <ul class="orderGoodsDetail cart-group">
                        <li v-for="(item,i) in ShopCartList" :key="i">
                            <div class="cart-group-name">
                                <p>{{item.name}}</p>
                            </div>
                            <span class="cart-group-count">x{{item.num}}</span>
                            <span class="cart-group-amount-warp">${{item.num*item.amount}}</span>
                        </li>
                    </ul>
                    <div class="cart-total">
                        <div class="cart-total-item">
                            <div class="text">小计</div>
                            <div class="value cart-total-amount">${{price.toFixed(2)}}</div>
                        </div>
                    </div>
                </div>

                <div class="customer mui-input-group">
                    <div class="title">客户信息</div>
                    <div class="mui-input-row">
                        <label>姓名</label>
                        <input type="text" id="Js_customer_name" placeholder="请输入姓名" v-model="uName">
                    </div>
                    <div class="mui-input-row">
                        <label>电话</label>
                        <input type="tel" id="Js_customer_mobile" placeholder="请输入电话" v-model="uTel">
                    </div>
                </div>
            </div>
            <!-- 下单后显示的页面 -->
            <div class="bill-detail-content" v-if="this.$store.getters.GetIsAddOrder==true||this.$store.getters.GetIsAddOrder=='true'">
                <div class="title1">您需要先完成支付，商家才能看到您的订单</div>

                <div class="bill-detail-goods-info">
                    <ul class="cart-group header">
                        <li>
                            <div class="cart-group-name">
                                <p>菜名</p>
                            </div>
                            <span class="cart-group-count">数量</span>
                            <span class="cart-group-amount-warp">金额</span>
                        </li>
                        <!--          		<li> -->

                        <!--          		<div class="order-goods-detail-name"><p style="color: #867e7e">菜名</p></div> -->
                        <!--          		<span class="order-goods-detail-count" style="color: #867e7e">数量</span> -->
                        <!--          		<span class="order-goods-detail-amount-warp" style="color: #867e7e">价格</span> -->
                        <!--          		</li> -->
                    </ul>
                    <div class="bill-order-goods-list">
                        <ul class="cart-group" v-if="ShopCartList[0].name!=null">
                            <li v-for="(item,i) of ShopCartList" :key="i">
                                <div class="cart-group-name">
                                    <p>{{item.name}}</p>
                                </div>
                                <span class="cart-group-count">x{{item.num}}</span>
                                <span class="cart-group-amount-warp">${{(item.amount*item.num).toFixed(2)||0.00}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="order-bill-detail-total">
                    <p>小计</p>
                    <p class="order-total">${{price.toFixed(2)||0.00}}</p>
                </div>
                <div class="order-bill-detail-total">
                    <p>税</p>
                    <p class="tax">$0.05</p>
                </div>
            </div>
            <!-- 下单后的订单信息 -->
            <div class="bill-info" v-if="this.$store.getters.GetIsAddOrder==true||this.$store.getters.GetIsAddOrder=='true'">
                <div class="title order-info">
                    订单信息
                    <span id="clearOrder" style="padding: 3px 10px 2px 10px;position: relative;bottom: 2px;" @click="Cancel">取消</span>
                </div>
                <div class="info">
                    <p>
                        下单时间：
                        <span id="JS_order_create_time">{{new Date()|datetimeFilter}}</span>
                    </p>

                    <div id="Js_customer_info">
                        <p>
                            客户姓名：
                            <span id="customer-name-text">{{uName}}</span>
                        </p>
                        <p>
                            客户电话：
                            <span id="customer-mobile-text">{{uTel}}</span>
                        </p>
                    </div>
                </div>
            </div>
            <!-- 下单后底部悬浮按钮 -->
            <div class="order-bill-btn" v-if="this.$store.getters.GetIsAddOrder==true||this.$store.getters.GetIsAddOrder=='true'">
                <div class="jiacai" @click="rollback">加单</div>
                <div class="maidan" @click="jump">买单</div>
            </div>
            <!-- 下单前的底部悬浮按钮 -->
            <div class="cart-pay" v-if="this.$store.getters.GetIsAddOrder==false">
                <div class="cart-amount-text cart-total-amount">${{price.toFixed(2)}}</div>
                <div class="cart-order-pay-btn" @click="addGoodsOrder">下单</div>
            </div>
        </div>
    </div>
    <home-header v-show="isGetData==true"></home-header>
</div>
</template>

<style>
.go-order {
    border: 1px solid #ed5b5b;
    padding: 5px 10px;
    border-radius: 20px;
    color: #ed5b5b;
}

.cart-pay .cart-order-pay-btn {
    width: 30%;
    background: #ed5b5b;
    color: #fff;
    height: 50px;
    line-height: 50px;
    text-align: center;
    display: inline-block;
    border: 0;
}

.cart-pay .cart-amount-text {
    width: 70%;
    font-size: 25px;
    color: #ed5b5b;
}

.cart-pay {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    height: 50px;
    background: #fff;
    line-height: 50px;
    text-align: center;
}

.customer .mui-input-row label~input {
    width: 80%;
    font-size: 14px;
}

.customer .mui-input-row label {
    font-size: 14px;
    width: 20%;
}

.customer .mui-input-row label~input {
    width: 80%;
    font-size: 14px;
}

.customer .mui-input-row label {
    font-size: 14px;
    width: 20%;
}

.customer .title {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    color: #7b7a7a;
}

.customer {
    margin-top: 10px;
    background: #ffffff;
    margin-bottom: 50px;
}

.order-cart-content .info .cart-total .cart-total-item .value {
    -webkit-flex: 3;
    flex: 3;
    text-align: right;
    font-weight: 600;
}

.order-cart-content .info .cart-total .cart-total-item .text {
    -webkit-flex: 7;
    flex: 7;
    text-align: right;
    color: #565353;
}

.order-cart-content .info .cart-total {
    text-align: right;
    padding: 10px 0px;
}

.order-cart-content .info .cart-total .cart-total-item {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    width: 100%;
    font-size: 14px;
}

.order-cart-content .info .cart-total {
    text-align: right;
    padding: 10px 0px;
}

.cart-group li .cart-group-amount-warp {
    font-size: 14px;
    -webkit-flex: 3;
    flex: 3;
    text-align: right;
}

.cart-group li .cart-group-count {
    -webkit-flex: 1;
    flex: 1;
    text-align: right;
    font-size: 14px;
}

.cart-group li .cart-group-name p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: 600;
    color: #000;
}

.cart-group li .cart-group-name {
    overflow: hidden;
    -webkit-flex: 7;
    flex: 7;
}

.cart-group li {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    width: 100%;
}

.order-cart-content .info .orderGoodsDetail li {
    border-bottom: 1px dotted #eee;
    padding: 15px 0px;
}

ul {
    list-style: none;
}

.order-cart-content .info ul.orderGoodsDetail,
.order-cart-content .info ul.orderGoodsDetail p {
    color: #333;
}

.order-cart-content .info .detail_title div span {
    border: 1px solid #ed5b5b;
    padding: 5px 10px;
    border-radius: 20px;
    color: #ed5b5b;
}

.r {
    float: right;
}

.order-cart-content .info .detail_title {
    border-bottom: 1px solid #cccccc;
    font-size: 14px;
    color: #7b7a7a;
    padding: 0px 0px 10px 0px;
}

.order-cart-content {
    position: relative;
    padding-bottom: 10px;
}

.order-cart-content .info {
    background: #fff;
    padding: 10px;
}

.order-info {
    width: 100%;
    height: 2rem;
    padding: 10px;
}

#billDetail .mui-page-content {
    background-color: #eee;
}

#billDetail .mui-page-content {
    background-color: #eee;
}

.store-info {
    margin-bottom: 10px;
}

.store-info .store-info-name {
    background: #fff;
    padding: 10px;
    font-size: 14px;
    color: #7b7a7a;
}

#billDetail .bill-detail-content {
    background: #fff;
    margin-top: 10px;
}

#billDetail .bill-detail-content .title1 {
    text-align: center;
    padding-top: 10px;
    font-size: 14px;
    color: #6d6b6b;
}

#billDetail .header {
    color: #867e7e;
}

ul {
    list-style: none;
}

ul,
menu,
dir {
    display: block;
    list-style-type: disc;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 40px;
}

#billDetail .bill-detail-content .bill-detail-goods-info .cart-group li {
    padding: 10px 10px;
    border-bottom: 1px solid #cccccc;
}

.cart-group li {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    width: 100%;
}

.cart-group li .cart-group-name {
    overflow: hidden;
    -webkit-flex: 7;
    flex: 7;
}

#billDetail .header .cart-group-name p {
    font-weight: 100;
    color: #867e7e;
}

.cart-group li .cart-group-name p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: 600;
    color: #000;
}

p {
    margin: 0;
}

.cart-group li .cart-group-count {
    -webkit-flex: 1;
    flex: 1;
    text-align: right;
    font-size: 14px;
}

.cart-group li .cart-group-amount-warp {
    font-size: 14px;
    -webkit-flex: 3;
    flex: 3;
    text-align: right;
}

#billDetail .bill-detail-content .bill-detail-goods-info .cart-group li {
    padding: 10px 10px;
    border-bottom: 1px solid #cccccc;
}

blockquote,
body,
button,
dd,
div,
dl,
dt,
form,
h1,
h2,
h3,
h4,
h5,
h6,
input,
li,
ol,
p,
pre,
td,
textarea,
th,
ul {
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

#billDetail .order-bill-detail-total {
    display: flex;
    align-items: center;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    padding: 10px;
}

#billDetail .order-bill-detail-total p {
    font-size: 16px;
    color: #000;
    font-weight: 600;
}

#billDetail .order-bill-detail-total {
    display: flex;
    align-items: center;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    padding: 10px;
}

#billDetail .bill-info {
    background: #fff;
    margin-top: 10px;
    margin-bottom: 50px;
}

#billDetail .bill-info .title {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    font-size: 16px;
}

#clearOrder {
    float: right;
    border: 1px solid #ed5b5b;
    padding: 0px 10px !important;
    border-radius: 10px;
    color: #ed5b5b;
}

#billDetail .bill-info .info {
    padding: 10px;
}

#billDetail .order-bill-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    text-align: center;
    background: #fff;
    height: 50px;
    line-height: 50px;
    -webkit-overflow-scrolling: touch;
}

#billDetail .order-bill-btn .jiacai {
    width: 50%;
    background: #807e7e;
    color: #fff;
}

#billDetail .order-bill-btn .maidan {
    width: 50%;
    background: #ed5b5b;
    color: #fff;
}
</style>

<script>
import HomeHeader from "@/components/transition/trans";
import {
    MessageBox,
    Indicator,
    Toast
} from "mint-ui";
export default {
    name: 'home',
    components: {
        HomeHeader
    },
    data() {
        return {
            //商品渲染数组
            ShopCartList: this.$store.getters.GetShopCartList[0].name == undefined ?
                "" : this.$store.getters.GetShopCartList,
            //保存小计
            price: 0,
            //判断是否下单
            isorder: false,
            //用户电话
            uTel: "",
            //用户名字
            uName: "",
            //判断是否是加单
            isAdd: this.$store.getters.GetIsAddOrder,
            //点击加菜或者继续点单前,将数据保存到这个数组
            EndList: [],
            //是否显示过渡组件
            isGetData: false
        };
    },
    computed: {
        /* count() {
          console.log(this.$store.state.menuList);
          return this.$store.state.menuList;
        } */
    },
    methods: {
        //继续点餐
        goOrder() {
            this.EndList = this.ShopCartList
            this.$store.commit("updateIsAddOrder", true);
            this.$router.push('order')
        },
        //点击下单按钮
        addGoodsOrder() {
            if (
                this.uName !== "" &&
                this.uTel !== "" &&
                this.ShopCartList !== ""
            ) {
                this.$store.commit("updateIsAddOrder", true);
                console.log(111)
            } else if (
                (this.uName == "" && this.uTel !== "") ||
                (this.uName == "" && this.uTel == "")
            ) {
                Toast({
                    message: "请输入客户姓名",
                    position: "middle",
                    duration: 3000
                });
            } else if (this.uName !== "" && this.uTel == "") {
                Toast({
                    message: "请输入客户电话",
                    position: "middle",
                    duration: 3000
                });
            } else if (this.uName !== "" && this.uTel !== "" && this.ShopCartList == "") {
                Toast({
                    message: "请确定购物车有商品",
                    position: "middle",
                    duration: 3000
                });
            }
        },
        jump() {
            this.$store.commit("updatePath", this.$route.path);
            this.$router.push("/transition");
        },
        //点击取消按钮
        Cancel() {
            MessageBox.confirm("确定执行此操作?").then(action => {
                if (action == "confirm") {
                    //这里执行成功回调
                    Indicator.open({
                        text: "请稍等...",
                        spinnerType: "fading-circle"
                    });
                    setTimeout(() => {
                        Indicator.close();
                        //MessageBox("提示", "操作成功");
                        MessageBox.alert('操作成功').then(action => {
                            //点击确认后的promise
                            this.isGetData = true
                            setTimeout(() => {
                                this.isGetData = false
                                this.$store.commit("updateIsAddOrder", false);
                                this.$router.push("/home");
                            }, 5000)
                        });
                    }, 3000);
                } else {
                    console.log(2);
                }
            });
        },
        init() {},
        //点击加菜
        rollback() {
            this.$store.commit("updateIsAddOrder", true);
            this.$router.push("/order");
        },
        //初始化,计算总价
        CputeSum() {
            var prices = 0;
            for (var item of this.ShopCartList) {
                prices += item.amount * item.num;
            }
            this.price = prices;
        }
    },
    created() {
        this.init();
        this.CputeSum();
        //console.log(this.ShopCartList)
        for (var item of this.ShopCartList) {
            this.EndList.push(item)
        }
        this.$store.commit("updateEndList", this.EndList);
        //console.log(this.EndList)
        console.log(this.$store.getters.GetEndList)
    },
    mounted: function () {

    }
};
</script>
