<template>
  <div v-if="visible" :class="{ center: center }" class="loading-box">
    <svg-icon icon-class="spinner" class-name="spinner" />
  </div>
</template>

<script>
import svgIcon from '@/components/svgIcon';

export default {
  name: 'Loading',
  components: {
    svgIcon
  },
  props: {
    progress: {
      type: Number,
      default: 0
    },
    show: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    visible() {
      return this.progress > 0 || this.show;
    }
  },
  mounted() {
    if (this.$el.parentNode) {
      this.$el.parentNode.style.position = 'relative';
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';

.loading-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 2;
  padding-top: 2rem;
  background-color: transparent;

  &.center {
    padding-top: 0;
    align-items: center;
  }

  .spinner {
    color: $primary;
    font-size: 2rem;
  }
}

.loading-parent {
  position: relative;
}
</style>
