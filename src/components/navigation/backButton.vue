<template>
  <v-icon color="primary" class="back-btn" @click="back">
    fas fa-chevron-left
  </v-icon>
</template>

<script>
export default {
  name: 'BackButton',
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.back-btn {
  height: 3rem;
  width: 2.25rem;

  &.v-icon {
    font-size: 1.5rem;
    margin-left: -0.5rem;
  }
}
</style>
