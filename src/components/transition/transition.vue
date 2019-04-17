<template style="background:#fff">
  <div class="transition-height">
    <mt-spinner :type="type" color="red" :size="150" style="margin-top:150px;margin-left:150px;"></mt-spinner>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 5,
      timer: null,
      path: this.$store.getters.GetPath,
      type: ""
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
    this.timer = setInterval(() => {
      console.log(this.count);
      if (this.path == "/details") {
        if (this.count <= 1) {
          //根据不同的路由,跳转不同的页面
          console.log("/details", 1);
          this.$router.push("bill");
          return;
        }
      }
      if (this.path == "/order") {
        if (this.count <= 1) {
          console.log("/order", 2);
          this.$router.push("details");
          return;
        }
      }
      if (this.path == "/bill") {
        if (this.count <= 1) {
          console.log("/bill", 3);
          //this.$router.push("details");
          return;
        }
      }
      this.count--;
    }, 1000);
    /*     var path = this.$store.getters.GetPath;
    console.log(path, 2);
    if (path == "/order") {
      this.type = "double-bounce";
      this.ComTime();
    }
    if (path == "/bill") {
      this.type = "triple-bounce";
      this.ComTime();
    }
    if (path == "/details") {
      this.type = "fading-circle";
      this.ComTime();
    } */
  },
  destroyed: function() {
    clearInterval(this.timer);
  },
  mounted: function() {},
  computed: {}
};
</script>
<style>
.transition-height {
  background: #fff!important;
  height: 1000px;
}
.mint-spinner-double-bounce {
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  margin-top: 45%;
}
.mint-spinner-fading-circle {
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  margin-top: 45%;
}
</style>
