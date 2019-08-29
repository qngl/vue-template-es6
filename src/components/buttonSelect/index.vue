<template>
  <v-layout align-start justify-start row wrap class="button-select">
    <v-btn
      v-for="(item, index) in options"
      :key="item[valueField]"
      :class="`option-${index}`"
      :disabled="disabled"
      :outline="selected.indexOf(item[valueField]) < 0"
      color="gray"
      @click="handleClick(item)"
    >
      {{ item['$formatedLabel'] }}
    </v-btn>
  </v-layout>
</template>

<script>
export default {
  name: 'ButtonSelect',
  props: {
    options: {
      type: Array,
      required: true
    },
    initial: {
      type: Array,
      default: () => []
    },
    valueField: {
      type: String,
      default: 'value'
    },
    labelField: {
      type: String,
      default: 'label'
    },
    required: {
      type: Boolean,
      default: true
    },
    formatLabel: {
      type: Boolean,
      default: false
    },
    unique: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selected: []
    };
  },
  watch: {
    initial() {
      if (this.initial) {
        this.selected = [].concat(this.initial);
      }
    },
    options() {
      this.formatLabels();
    }
  },
  created() {
    if (this.initial) {
      this.selected = [].concat(this.initial);
    }
    this.formatLabels();
  },
  methods: {
    formatLabels() {
      this.options.forEach(opt => {
        if (this.formatLabel) {
          const idx = opt[this.labelField].indexOf('-') + 1;
          if (idx > 0) {
            this.$set(opt, '$formatedLabel', opt[this.labelField].substring(idx));
          } else {
            this.$set(opt, '$formatedLabel', opt[this.labelField]);
          }
        } else {
          this.$set(opt, '$formatedLabel', opt[this.labelField]);
        }
      });
    },
    handleClick(item) {
      if (this.unique) {
        this.selected = [item[this.valueField]];
      } else {
        const idx = this.selected.indexOf(item[this.valueField]);
        if (idx >= 0) {
          if (!this.required || this.selected.length > 1) {
            this.selected.splice(idx, 1);
          }
        } else {
          this.selected.push(item[this.valueField]);
        }
      }
      this.$emit('change', [].concat(this.selected));
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';

.button-select {
  margin-left: -0.25rem;
  margin-right: -0.25rem;

  .v-btn {
    padding: 0.25rem 0.5rem;
    margin: 0.25rem;
    min-width: 4rem;
    height: auto;
    font-size: 0.75rem;
    background-color: $bg-gray-highlight !important;

    &.v-btn--outline {
      background-color: $bg-gray !important;
      color: $secondary !important;
      border-color: $bg-gray-highlight;
    }
  }

  &.error--text {
    .v-btn.v-btn--outline {
      border-color: $error;
    }
  }

  .v-btn--active:before,
  .v-btn:focus:before,
  .v-btn:hover:before {
    background-color: transparent;
  }
}
</style>
