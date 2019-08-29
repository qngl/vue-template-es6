<template>
  <v-list-tile :to="to" exact>
    <v-list-tile-action>
      <v-icon v-if="icon">
        {{ icon }}
      </v-icon>
      <svg-icon v-if="svgIcon" :icon-class="svgIcon" class-name="v-icon" />
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>{{ pageTitle }}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  name: 'SideMenuItem',
  props: {
    route: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: null
    },
    svgIcon: {
      type: String,
      default: null
    }
  },
  computed: {
    currentRoute() {
      return this.$route.name;
    },
    pageTitle() {
      return this.$t('menu.' + this.route);
    },
    to() {
      return {
        name: this.route
      };
    }
  }
};
</script>
