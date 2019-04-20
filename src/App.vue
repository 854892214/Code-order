<template>
  <div>
    <header class="mui-bar mui-bar-nav">
      <a class="mui-icon mui-icon-back" style="color:red" @click="jump"></a>
      <h1 class="mui-title">{{val}}</h1>
      <span class="float-right">自取</span>
    </header>
    <!-- 占位符用来显示其它的组件-->
    <transition>
      <router-view :key="key"></router-view>
    </transition>
  </div>
</template>
<style scoped>
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
    jump() {
      /* this.$store.commit("callbackPath", this.backpath);
      this.$router.push("/transition"); */
      if (this.$route.path == "/details") {
        this.$router.push("order");
        return;
      }
      if (this.$route.path == "/order") {
        this.$router.push("home");
        return;
      }
      if (this.$route.path == "/bill") {
        this.$router.push("details");
        return;
      }
    }
  },
  created() {},
  mounted: function() {
    //this.init();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: {
      handler: function() {
        var nowPath = this.$route.path;
        if (nowPath == "/transition") {
          document.getElementsByClassName("mui-bar")[0].className +=
            " display-none";
        }
        if (nowPath !== "/transition") {
          document
            .getElementsByClassName("mui-bar")[0]
            .classList.remove("display-none");
        }
        if (nowPath !== "/home") {
          document
            .getElementsByClassName("mui-icon")[0]
            .classList.remove("display-none");
        }
        if (nowPath == "/home") {
          document
            .getElementsByClassName("mui-icon")[0].className+=" display-none"
        }
        if (nowPath == "/order") {
          this.val="在线点单"
        }
        if (nowPath == "/details") {
          this.val="账单详情"
        }
        if (nowPath == "/bill") {
          this.val="账单"
        }
        //this.$router.go(0)
      }
    }
  },
  computed: {
    key() {
      //console.log('.....')
      return this.$route.name !== undefined
        ? this.$route.name + new Date()
        : this.$route + new Date();
    }
  }
};
</script>

