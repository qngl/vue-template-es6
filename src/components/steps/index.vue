<template>
  <v-layout v-if="isProgressType" column class="steps-box">
    <v-progress-linear v-model="progress" height="2" />
    <v-layout align-start justify-space-around row class="progress-label-box">
      <div
        v-for="(item, index) in steps"
        :key="'progress-' + index"
        :class="{ active: index <= step, current: index === step }"
        class="progress-box"
      >
        <i class="fas fa-circle progress-icon" />
        <div class="tick">
          |
        </div>
        <div>{{ item.label }}</div>
      </div>
    </v-layout>
  </v-layout>
  <v-layout v-else align-start justify-space-around row class="steps-box">
    <template v-for="(item, index) in steps">
      <step :key="'icon-' + index" :current="step" :index="index" :label="item.label" :icon="item.icon" :svg-icon="item.svgIcon" />
      <v-divider v-if="index + 1 < steps.length" :key="index" :class="{ active: step > index }" />
    </template>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import step from './step';

export default {
  name: 'Steps',
  components: {
    step
  },
  props: {
    step: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      steps: [
        { label: this.$t('steps.chooseVehicle'), svgIcon: 'car' },
        { label: this.$t('steps.chooseProduct'), svgIcon: 'car-con' },
        { label: this.$t('steps.quotationCalculation'), icon: 'fas fa-coins' },
        { label: this.$t('steps.applicationForm'), icon: 'fas fa-clipboard-list' },
        { label: this.$t('steps.findDealer'), icon: 'fas fa-building' }
      ]
    };
  },
  computed: {
    ...mapGetters(['theme']),
    isProgressType() {
      return this.theme === 'bentley';
    },
    progress() {
      if (this.step === this.steps.length - 1) {
        return 100;
      }
      const stepDistance = 100 / this.steps.length;
      return stepDistance / 2 + stepDistance * this.step;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';

.steps-box {
  .step-box {
    text-align: center;
    width: 15%;
    margin-bottom: 0.75rem;
    background-color: $primary;
    color: $info;

    .step-icon {
      .v-icon {
        font-size: 2rem;
        color: $info;
      }
    }

    .step-label {
      font-size: 0.875rem;
      text-align: center;
    }

    .v-divider {
      margin: 1rem 0 0;
      border-color: $info;
    }

    &.active {
      color: $white;

      .step-icon .v-icon {
        color: $white;
      }

      .step-label {
        color: $white;
      }

      &.v-divider {
        border-color: $white;
      }
    }
  }

  .v-progress-linear {
    margin: 0.5rem 0;

    &__background.primary {
      background-color: $secondary !important;
      border-color: $secondary !important;
    }

    &__bar__determinate.primary {
      background-color: $success !important;
      border-color: $success !important;
    }
  }

  .progress-label-box {
    margin-top: -1.1875rem;

    .progress-box {
      text-align: center;
      font-size: 0.75rem;
      z-index: 1;

      .progress-icon {
        font-size: 0.75rem;
        opacity: 0;
        color: transparent;
      }

      .tick {
        font-size: 0.375rem;
        line-height: 0.25rem;
      }

      &.active {
        color: $success;
      }

      &.current {
        .progress-icon {
          opacity: 1;
          color: $success;
        }
      }
    }
  }
}
</style>
