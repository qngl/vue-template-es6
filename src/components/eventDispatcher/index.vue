<template>
  <div class="event-dispatcher">
    <input id="event-dispatcher" v-model="event" type="text" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      event: null
    };
  },
  watch: {
    event() {}
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';

.event-dispatcher {
  display: absolute;
  top: 0;
  left: 0;
  height: 1px;
  width: 1px;
  opacity: 0.01;

  & input {
    color: transparent;
    background-color: transparent;
    border: none;
    box-shadow: none;
  }
}
</style>
