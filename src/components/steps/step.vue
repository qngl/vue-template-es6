<template>
  <div :class="{ active: complete, 'step-box': true }">
    <div class="step-icon">
      <svg-icon v-if="isSvgIcon" :icon-class="svgIcon" class-name="v-icon" />
      <v-icon v-else>
        {{ icon }}
      </v-icon>
    </div>
    <div class="step-label">
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Step',
  props: {
    current: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    svgIcon: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    complete() {
      return this.index <= this.current;
    },
    isSvgIcon() {
      return !!this.svgIcon;
    }
  }
};
</script>
