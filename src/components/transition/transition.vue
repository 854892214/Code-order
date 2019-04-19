<template style="background:#fff">
  <div class="transition-height">
    <mt-spinner :type="type" color="red" :size="100" style="margin-top:150px;margin-left:150px;"></mt-spinner>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 3,
      timer: null,
      path: this.$store.getters.GetPath,
      type: "",
      backpath: this.$store.getters.GetbackPath
    };
  },
  methods: {},
  created() {
    if (this.path == "/details") {
      this.type = "double-bounce";
    }
    if (this.path == "/order") {
      this.type = "fading-circle";
    }
    if (this.path == "/bill") {
      this.type = "fading-circle";
    }
    if (this.path == "/Home") {
      this.type = "double-bounce";
    }
    this.timer = setInterval(() => {
      if (this.path == "/order") {
        if (this.count <= 1) {
          this.$router.push("details");
          return;
        }
      }
      if (this.path == "/home") {
        if (this.count <= 1) {
          this.$router.push("order");
          return;
        }
      }
      /* 向下判断 */
      if (this.path == "/details") {
        if (this.count <= 1) {
          //根据不同的路由,跳转不同的页面
          this.$router.push("bill");
          return;
        }
      }
      if (this.path == "/bill") {
        if (this.count <= 1) {
          //this.$router.push("details");
          return;
        }
      }
      this.count--;
    }, 1000);
  },
  destroyed: function() {
    clearInterval(this.timer);
  },
  mounted: function() {},
  computed: {}
};
</script>
<style>
.mint-spinner-snake {
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  margin-top: 55%;
}
.transition-height {
  background: #fff !important;
  height: 1000px;
}
.mint-spinner-double-bounce{
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  margin-top: 55%;
}
.mint-spinner-fading-circle {
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  margin-top: 55%;
}
</style>
