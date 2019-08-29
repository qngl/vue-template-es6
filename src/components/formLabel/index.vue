<template>
  <div :class="{ required: required }" class="form-label">
    <i :class="{ required: required }" aria-hidden="true" class="fas fa-circle form-label--icon" />
    <span class="form-label--text">
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    required: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';

.form-label {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  height: 2rem;

  &--icon {
    color: $info;
    font-size: 0.5rem;
    line-height: 0.5rem;
    margin: 0.125rem 0.5rem 0;

    &.required {
      color: $error;
    }
  }
}
</style>
