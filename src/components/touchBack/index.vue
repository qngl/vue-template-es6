<template>
  <div v-touch="backTouch" class="touch-back" />
</template>

<script>
export default {
  computed: {
    backTouch() {
      return {
        right: () => window.history.back()
      };
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.touch-back {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 1px;
  height: 100vh;
  background-color: transparent;
}
</style>
