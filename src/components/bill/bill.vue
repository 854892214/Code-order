<template>
  <div>
    <!-- the router outlet, where all matched components would ber viewed -->
    <div>这是账单页面</div>
    <div id="billPay" class="mui-page mui-page-center" style="margin-top:2.8rem">
      <div class="mui-page-content" style="overflow-x: hidden; overflow-y: auto;">
        <div class="bill-amount-warp">
          <div class="billAmount">$1.20</div>
        </div>
        <div class="bill-pay-content">
          <div class="title">
            <div class="bill-desk">到店自取</div>
            <div class="bill-count">
              共
              <span>1</span>份
            </div>
            <!--          			<div class="bill-amoumt">合计：<span class="billAmount">$0.00</span></div> -->
          </div>
          <ul class="cart-group header">
            <li>
              <div class="cart-group-name">
                <p>菜名</p>
              </div>
              <span class="cart-group-count">数量</span>
              <span class="cart-group-amount-warp">价格</span>
            </li>
          </ul>
          <div class="bill-order-goods-list">
            <ul class="cart-group">
              <li>
                <div class="cart-group-name">
                  <p>米饭</p>
                </div>
                <span class="cart-group-count">x1</span>
                <span class="cart-group-amount-warp">$1.00</span>
              </li>
            </ul>
          </div>
          <div class="info">
            <div class="bill-item">
              <p>小计</p>
              <p class="order-total">$1.00</p>
            </div>
            <div class="bill-item" style>
              <p>税费</p>
              <p class="tax">$0.05</p>
            </div>
            <div class="bill-item" style>
              <p>小费</p>
              <p class="tip">$0.15</p>
            </div>
          </div>
          <div class="bill-total-amount">
            合计：
            <span class="billAmount">$1.20</span>
          </div>
        </div>
        <div id="btnPay" @click="clickPayment()">
          <span class="billAmount" style="padding-right: 10px;">$1.20</span>确认买单
        </div>
      </div>
    </div>
    <mt-popup v-model="popupVisible" popup-transition="popup-fade" style="width:95%">
      <tip msg-father="dad无可奉告"></tip>
    </mt-popup>
  </div>
</template>

<script>
import tip from "./tip.vue";
import { Indicator, Toast } from "mint-ui";
export default {
  components: {
    tip
  },
  data() {
    return {
      popupVisible: true
    };
  },
  methods: {
    clickPayment() {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      setTimeout(function() {
        Indicator.close();
        Toast({
          message: "网络错误",
          position: "bottom",
          duration: 3000
        });
      }, 3000);
      console.log(this.$route.path,1)
      /* this.$store.commit("updatePath", this.$route.path);
      this.$router.push('/transition') */
    }
  }
};
</script>
<!-- styling for the component -->
<style>
.mui-pages .mui-page {
  display: block;
}
.mui-views,
.mui-view,
.mui-pages,
.mui-page,
.mui-page-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
#billPay .mui-page-content {
  background-color: #eee;
}
#billPay .bill-amount-warp {
  height: 120px;
  text-align: center;
  line-height: 120px;
  font-size: 2rem;
  font-weight: 100;
  color: #ed5b5b;
  overflow: hidden;
}
#billPay .bill-pay-content {
  background: #fff;
  margin-bottom: 70px;
}
#billPay .bill-pay-content .title {
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #cccccc;
  font-size: 16px;
  padding: 10px;
}
#billPay .bill-pay-content .title .bill-desk {
  overflow: hidden;
  -webkit-flex: 5;
  flex: 5;
  line-height: 19px;
}
#billPay .bill-pay-content .title .bill-count {
  -webkit-flex: 1;
  flex: 1;
  text-align: right;
}
#billPay .header {
  color: #867e7e;
}
ul {
  list-style: none;
}
#billPay .header li {
  border-bottom: 1px solid #cccccc;
  padding: 10px 10px;
}
#billPay .cart-group li {
  padding: 5px 10px;
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
#billPay .header .cart-group-name p {
  font-weight: 100;
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
#billPay .bill-amount-warp {
  height: 120px;
  text-align: center;
  line-height: 120px;
  font-size: 2rem;
  font-weight: 100;
  color: #ed5b5b;
  overflow: hidden;
}
.cart-group li .cart-group-amount-warp {
  font-size: 14px;
  -webkit-flex: 3;
  flex: 3;
  text-align: right;
}
#billPay .bill-order-goods-list {
  padding: 10px 0px;
}
.cart-group li .cart-group-count {
  -webkit-flex: 1.5;
  flex: 1.5;
  text-align: right;
  font-size: 14px;
}
#billPay .bill-pay-content .info {
  border-bottom: 1px solid #cccccc;
  border-top: 1px solid #ccc;
}
#billPay .bill-pay-content .info .bill-item {
  display: flex;
  align-items: center;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  padding: 5px 10px;
}
#billPay .bill-pay-content .info .bill-item p {
  color: #000;
}
#billPay .bill-total-amount {
  padding: 10px;
  text-align: right;
  font-weight: 600;
}
#btnPay {
  position: fixed;
  bottom: 0;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #ed5b5b;
  width: 100%;
  color: #fff;
}
</style>

