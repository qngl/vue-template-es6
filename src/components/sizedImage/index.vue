<template>
  <v-img :src="url" :lazy-src="placeholder" :height="height" :aspect-ratio="aspectRatio">
    <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
      <i class="fas fa-spinner fa-spin" />
    </v-layout>
  </v-img>
</template>

<script>
import defaultVehiclePlaceholder from '@/assets/images/default-vehicle.svg';
import defaultPlaceholder from '@/assets/images/default-blank.svg';

export default {
  name: 'SizedImage',
  props: {
    vehicle: {
      type: Boolean,
      default: true
    },
    src: {
      type: String,
      required: true
    },
    height: {
      type: Number,
      default: void 0
    },
    aspectRatio: {
      type: Number,
      default: void 0
    }
  },
  computed: {
    placeholder() {
      return this.vehicle ? defaultVehiclePlaceholder : defaultPlaceholder;
    },
    url() {
      if (this.src) {
        // if (this.$vuetify.breakpoint.smAndDown) {
        //   return this.src.replace('{0}', 'M');
        // } else {
        // always use full-sized images
        const cdn = window.ENV.CDN_DOMAIN;
        return cdn + this.src.replace('{0}', 'F');
        // }
      } else {
        return this.placeholder;
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.v-image__image {
  background-size: 101%;
}
</style>
