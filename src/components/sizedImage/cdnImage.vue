<template>
  <img :alt="$attrs.alt" :class="$attrs.class" :src="url" />
</template>

<script>
import defaultPlaceholder from '@/assets/images/default-blank.svg';

export default {
  name: 'CdnImage',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  computed: {
    url() {
      if (this.src) {
        return this.src;
      } else {
        return defaultPlaceholder;
      }
    }
  }
};
</script>
