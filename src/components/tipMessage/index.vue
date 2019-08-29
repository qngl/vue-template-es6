<template>
  <span class="tip-message">
    <i class="fas fa-caret-left tip-message--icon" aria-hidden="true" />
    <span :class="{ 'error-msg': error }" class="tip-message--text">
      <slot />
    </span>
  </span>
</template>

<script>
export default {
  props: {
    error: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';

.tip-message {
  display: inline;
  font-size: 0.875rem;
  padding-left: 1rem;

  &--icon {
    color: $white;
    font-size: 0.75rem;
    line-height: 0.75rem;
    margin: 0 -0.25rem 0;
  }

  &--text {
    &.error-msg {
      border: 1px solid $white;
      border-radius: 0.125rem;
      padding: 0 1rem 0.125rem;
      line-height: 1;
      font-size: 0.75rem;
      background-color: $white;
      color: $error;
    }
  }
}
</style>
