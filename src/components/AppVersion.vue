<template>
  <span class="app-version"> &#x2164;{{ version }} </span>
</template>

<script>
export default {
  name: 'AppVersion',
  data() {
    return {
      version: process.env.VUE_APP_VERSION
    };
  }
};
</script>

<style lang="scss">
.app-version {
  opacity: 0.8;
  color: #42b983;
}
</style>
