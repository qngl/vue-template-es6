<template>
  <v-btn
    v-show="visible"
    color="primary"
    dark
    fab
    fixed
    bottom
    right
    round
    class="scroll-to-btn"
    transition="fade-transition"
    @click="scrollTo"
  >
    <v-icon dark>
      fas fa-arrow-up
    </v-icon>
  </v-btn>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'ScrollTo',
  props: {
    visibilityHeight: {
      type: Number,
      default: 200
    },
    backPosition: {
      type: Number,
      default: 21
    },
    transitionName: {
      type: String,
      default: 'fade'
    },
    scrollContainer: {
      type: HTMLElement,
      default: null
    }
  },
  data() {
    return {
      visible: false,
      container: null,
      trigger: null,
      top: 0
    };
  },
  mounted() {
    this.container = this.scrollContainer || document.documentElement;
    this.trigger = this.scrollContainer || document.body;
    const self = this;
    this.trigger.onscroll = function() {
      self.handleScroll();
    };
  },
  beforeDestroy() {
    this.trigger.onscroll = undefined;
  },
  methods: {
    handleScroll: _.debounce(function() {
      this.visible = this.container.scrollTop > this.visibilityHeight;
    }, 300),
    scrollTo() {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(this.smoothScrollUp);
      } else {
        this.container.scrollTop = this.top;
      }
    },
    smoothScrollUp() {
      const distance = this.container.scrollTop - this.top;
      const SPEED_TO_SCROLL = 5;

      if (distance <= this.backPosition) {
        this.container.scrollTop = this.top;
      } else {
        this.container.scrollTop = this.container.scrollTop - distance / SPEED_TO_SCROLL;
        window.requestAnimationFrame(this.smoothScrollUp);
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';

.scroll-to-btn.v-btn--round {
  opacity: 0.75;
  height: 3rem;
  width: 3rem;
  border-radius: 1.5rem;
}
</style>
