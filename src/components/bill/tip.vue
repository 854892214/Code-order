<template>
  <div class="hello">
    <div class="tipContent" style="height: 375px;">
    <!-- <p>{{msgFather}}</p> -->
      <div class="tip_title">添加小费</div>
      <div class="tip_table_view">
        <div id="Js_tip_html">
          <div class="tip_table_cell" onclick="clickTip(0.15)">
            <p>小费：15%($0.15)</p>
          </div>
          <div class="tip_table_cell" onclick="clickTip(0.20)">
            <p>小费：20%($0.20)</p>
          </div>
          <div class="tip_table_cell" onclick="clickTip(0.30)">
            <p>小费：30%($0.30)</p>
          </div>
        </div>
        <div class="tip-input">
          <div class="tip-price-input">
            <span>$</span>
            <span class="tip-price-input-val"></span>
          </div>
          <div class="add-tip-btn">添加</div>
        </div>
        <div class="tip_table_cell" onclick="clickTip(0)">
          <p>无小费</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {};
  },
  props: ["msgFather"]
};
</script>

<style>
#tip .tipContent {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background: #fff;
  margin: auto 10px;
}
.tip_title {
    text-align: center;
    font-size: 20px;
    padding: 20px 20px 10px 20px;
}
.tip_table_view {
    position: relative;
    width: 100%;
    padding: 10px;
}
* {
    padding: 0;
    margin: 0;
}
.tip_table_view .tip_table_cell {
    background: #ED5B5B;
    border-radius: 5px;
    text-align: center;
    padding: 15px;
    margin-bottom: 10px;
}
.tip_table_view .tip_table_cell p {
    font-size: 16px;
    color: #fff;
    margin: 0
}
p {
    margin: 0;
}
p {
    display: block;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
}
.tip-input {
    display: flex;
    align-items: center;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    margin-bottom: 10px;
}
.tip-input .tip-price-input {
    border: 1px solid #ccc;
    width: 70%;
    margin-right: 10px;
    padding: 14px 10px;
    border-radius: 5px;
    font-size: 16px;
}
.tip-input .add-tip-btn {
    width: 30%;
    text-align: center;
    padding: 15px;
    background: #ED5B5B;
    border-radius: 5px;
    color: #fff;
}
.tip-input .tip-price-input-val {
    padding-left: 3px;
}
.tip-input .add-tip-btn {
    width: 30%;
    text-align: center;
    padding: 15px;
    background: #ED5B5B;
    border-radius: 5px;
    color: #fff;
}
</style>