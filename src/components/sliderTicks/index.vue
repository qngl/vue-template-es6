<template>
  <div class="ticks-box">
    <div v-for="(item, index) in ticks" :key="`tick-${index}`" :style="{ width: item.width }" class="tick-box">
      <div class="tick-marker" />
      <div :class="{ first: index === 0 }" class="tick-label">
        <span @click="setSliderValue(item)"> {{ $num(item.value / formatStep) }}{{ labelSuffix }} </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SliderTicks',
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: null
    },
    formatStep: {
      type: Number,
      default: 10000
    },
    suffix: {
      type: String,
      default: ''
    }
  },
  computed: {
    ticks() {
      const items = [];
      const total = this.max - this.min;
      const step = this.step ? this.step : Math.pow(10, (total + '').length - 1);
      const count = Math.floor(total / step);
      let start = step * Math.ceil(this.min / step);
      let last = this.min;
      if (start !== this.min) {
        items.push({ width: 0, value: this.min });
      }
      for (let i = 0; i <= count; i++) {
        if (start <= this.max) {
          const width = ((start - last) / total) * 100 + '%';
          items.push({ width: width, value: start });
        }
        last = start;
        start += step;
      }
      return items;
    },
    labelSuffix() {
      return this.suffix ? this.suffix : this.$t('product.wan');
    }
  },
  methods: {
    setSliderValue(item) {
      this.$emit('change', item.value);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';

.ticks-box {
  display: block;
  width: 100%;
  height: 2.25rem;

  .tick-box {
    float: left;
    text-align: right;
    display: block;
  }

  .tick-marker {
    border-right: 1px solid $secondary;
    height: 0.25rem;
  }

  .tick-label {
    position: relative;
    right: -0.625rem;
    color: $secondary;
    font-size: 0.75rem;

    &.first {
      right: 0.5rem;
    }

    & > span {
      width: 3rem;
      white-space: nowrap;
    }
  }
}
</style>
