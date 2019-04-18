<template>
  <div class="loading">
      这是trans页面
  </div>
</template>

<script>
export default {
    name:'Loading'
};
</script>

<style scoped>
.loading {
  position: fixed;
  left: 0;
  top: 0;
  background: url("../../img/loading.svg") center center no-repeat #fff;
  width: 100px;
  height: 100px;
  z-index: 1000;
  background: red
}
</style>