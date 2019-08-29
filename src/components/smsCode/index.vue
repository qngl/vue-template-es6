<template>
  <v-text-field
    ref="smsCodeInput"
    v-model="value"
    :placeholder="$t('input.pleaseEnterVerificationCode')"
    :rules="$attrs.rules"
    validate-on-blur
    mask="###############"
    outline
    pattern="[0-9]*"
    type="tel"
    class="sms-code-input"
    @input="enterSmsCode"
    @blur="$emit('blur')"
  >
    <v-btn v-if="isBtn" slot="append" v-font-color="$vuetify.theme.primary" :disabled="!!tip" @click="sendSmsCode">
      {{ tip || label }}
      <i v-if="sending" class="fas fa-spinner fa-spin" />
    </v-btn>
  </v-text-field>
</template>

<script>
import { clearTimeout } from 'timers';
export default {
  name: 'SmsCode',
  props: {
    retryIn: {
      type: Number,
      default: 0
    },
    start: {
      type: Number,
      default: 0
    },
    sending: {
      type: Boolean,
      default: false
    },
    isBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: null,
      timeSpan: 0,
      label: this.$t('action.sendSmsCode'),
      tip: '',
      timeSpanTask: null
    };
  },
  watch: {
    start() {
      this.timeSpan = this.retryIn;
      this.showTimeLeft();
    }
  },
  beforeDestroy() {
    this.timeSpan = 0;
    if (this.timeSpanTask) {
      clearTimeout(this.timeSpanTask);
    }
  },
  methods: {
    showTimeLeft() {
      if (this.timeSpan > 0) {
        this.tip = this.$t('message.smsRetryDelay', [this.timeSpan]);
        this.timeSpanTask = setTimeout(() => {
          this.showTimeLeft();
        }, 1000);
      } else {
        this.tip = '';
      }
      this.timeSpan--;
    },
    enterSmsCode() {
      this.$emit('input', this.value);
    },
    sendSmsCode() {
      this.$emit('send');
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';

.v-text-field.sms-code-input {
  input {
    margin-top: 0.375rem;
  }

  .v-input__append-inner {
    margin-top: 0.375rem;
    margin-right: -0.75rem;

    .v-btn {
      margin: 0;
      border-radius: 2rem;
      height: 2rem;
      color: $primary;
      background-color: $bg-gray;
    }
  }
}
</style>
