<template>
  <div>
    <header class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" style="color:red"></a>
      <h1 class="mui-title">{{val}}</h1>
      <span class="float-right">堂食</span>
    </header>
    <!-- 占位符用来显示其它的组件-->
    <router-view></router-view>
  </div>
</template>
<style>
.float-right {
  float: right;
  line-height: 2.8rem;
}
.display-none {
  display: none !important;
}
</style>
<script>
export default {
  data() {
    return {
      val: "首页"
    };
  },
  methods: {
    init() {
      if (this.$route.path == "/home") {
        document.getElementsByClassName("mui-icon")[0].className +=
          " display-none";
      }
      if (this.$route.path == "/order") {
        this.val = "在线点单";
      }
      //alert(1)
    }
  },
  created() {},
  mounted: function() {
    //this.init();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "init"
  }
};
</script>

