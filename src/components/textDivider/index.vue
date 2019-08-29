<template>
  <v-layout align-center justify-center row class="text-divider">
    <v-divider :color="$vuetify.theme.info" />
    <div class="text-divider-text">
      {{ text }}
    </div>
    <v-divider :color="$vuetify.theme.info" />
  </v-layout>
</template>

<script>
export default {
  name: 'TextDivider',
  props: {
    text: {
      type: String,
      required: true
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';

.text-divider {
  color: $white;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}
</style>
