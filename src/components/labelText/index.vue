<template>
  <div class="label-text">
    <span class="label-text--label">
      {{ label }}
    </span>
    <span class="label-text--text">
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  name: 'LabelText',
  props: {
    label: {
      type: String,
      default: ''
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';

.label-text {
  &--label {
    font-size: 0.8125rem;
    padding-right: 1.5rem;

    &:after {
      content: ':';
    }
  }

  &--text {
    color: $primary;
    font-size: 0.9375rem;
    font-weight: bold;
  }
}
</style>
