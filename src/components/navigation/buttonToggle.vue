<template>
  <v-btn
    v-if="$vuetify.breakpoint.smAndDown"
    color="primary"
    dark
    fab
    fixed
    bottom
    right
    class="side-menu-toggle-btn"
    @click="toggleSideMenu"
  >
    <v-icon>fas fa-bars</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'NavigationButtonToggle',
  methods: {
    toggleSideMenu() {
      this.$store.dispatch('toggleSideBar');
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.side-menu-toggle-btn {
  opacity: 0.75;
  height: 3rem;
  width: 3.5rem;
}
</style>
