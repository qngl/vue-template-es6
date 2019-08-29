<template>
  <div v-touch="drawerTouch" class="touch-open-drawer" @click="toggleSideMenu" />
</template>

<script>
export default {
  name: 'NavigationTouchToggle',
  computed: {
    drawerTouch() {
      return {
        left: () => this.toggleSideMenu(),
        right: () => this.toggleSideMenu()
      };
    }
  },
  methods: {
    toggleSideMenu() {
      this.$store.dispatch('toggleSideBar');
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.touch-open-drawer {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 1px;
  height: 20vh;
  background-color: transparent;
}
</style>
