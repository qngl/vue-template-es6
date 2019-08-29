<template>
  <v-bottom-sheet v-model="visible" full-width>
    <v-text-field
      slot="activator"
      v-model="value"
      :append-icon="activatorIcon"
      :class="{ 'error--text': invalid }"
      :placeholder="$t('input.pleaseSelect')"
      single-line
      outline
      readonly
      class="bottom-sheet-select-input"
    />

    <v-layout row wrap class="bottom-sheet-select">
      <v-flex xs12>
        <v-subheader class="justify-center">
          {{ $t('input.pleaseSelect') }}
        </v-subheader>
      </v-flex>
      <v-flex xs12 class="scroll-box">
        <v-list>
          <v-list-tile
            v-for="item in options"
            :id="`item-${item[valueField]}`"
            :key="item[valueField]"
            :class="{ active: selected.indexOf(item) >= 0 }"
            @click="handleClick(item)"
          >
            <v-list-tile-title>{{ item['$formatedLabel'] }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: 'BottomSheetSelect',
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
    activatorIcon: {
      type: String,
      default: 'fas fa-caret-down'
    },
    required: {
      type: Boolean,
      default: true
    },
    unique: {
      type: Boolean,
      default: false
    },
    invalid: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selected: [],
      visible: false
    };
  },
  computed: {
    value() {
      let val = '';
      this.selected.forEach(opt => {
        val += opt['$formatedLabel'] + ' ';
      });
      return val;
    }
  },
  created() {
    this.options.forEach(opt => {
      if (this.initial.indexOf(opt[this.valueField]) >= 0) {
        this.selected.push(opt);
      }
      const idx = opt[this.labelField].indexOf('-') + 1;
      if (idx > 0) {
        this.$set(opt, '$formatedLabel', opt[this.labelField].substring(idx));
      } else {
        this.$set(opt, '$formatedLabel', opt[this.labelField]);
      }
    });
  },
  methods: {
    handleClick(item) {
      if (this.unique) {
        this.selected = [item];
        this.visible = false;
      } else {
        const idx = this.selected.indexOf(item);
        if (idx >= 0) {
          if (!this.required || this.selected.length > 1) {
            this.selected.splice(idx, 1);
          }
        } else {
          this.selected.push(item);
        }
      }
      this.$emit('change', [].concat(this.selected));
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';

.bottom-sheet-select-input {
  .v-messages {
    display: none;
  }
}

.bottom-sheet-select {
  height: calc(100vh - 15rem);

  & > .scroll-box {
    height: calc(100% - 3rem);
    overflow: auto;
  }

  .v-list > div {
    text-align: center;

    &.active {
      background-color: $bg-gray;
    }
  }

  .v-list__tile__title {
    text-align: center;
  }
}

.v-bottom-sheet.v-dialog {
  background-color: $white;
}
</style>
