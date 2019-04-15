<template>
  <transition name="slide">
    <div>
      <div @click="jump" style="margin-top:3rem">点我跳转</div>
      <mt-spinner
        type="double-bounce"
        color="red"
        :size="150"
        style="margin-top:150px;margin-left:150px;"
      ></mt-spinner>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    init() {
      var s = 0;
      var loop = setInterval(function() {
        s++;
        console.log(s);
        if (s > 3) {
          clearInterval(loop);
          console.log("计时停止", this.$router);
          this.jump.push("/details");
        }
      }, 1000);
    },
    jump() {
      this.$router.push("/details");
    }
  },
  created() {
    this.init();
  }
};
</script>
<style>
</style>
