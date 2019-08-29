<template>
  <v-navigation-drawer v-model="drawer" color="white" dark fixed right touchless app>
    <side-menu @toggle="toggleSideMenu" />
  </v-navigation-drawer>
</template>

<script>
import sideMenu from './sideMenu';
import { mapGetters } from 'vuex';

export default {
  name: 'Navigation',
  components: {
    sideMenu
  },
  computed: {
    ...mapGetters(['sidebar']),
    drawer: {
      get: function() {
        return this.sidebar ? this.sidebar.opened : false;
      },
      set: function(newValue) {
        if (this.sidebar.opened !== newValue) {
          this.toggleSideMenu();
        }
      }
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
@import '@/styles/variables.scss';

.theme--dark.v-navigation-drawer {
  background-color: $primary;
}
</style>
