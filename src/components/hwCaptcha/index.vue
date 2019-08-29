<template>
  <div class="vw-hwcaptcha">
    <div id="demo-captcha-wraper" class="captcha-wraper" @click="validatePhone" />
  </div>
</template>

<script>
const hwCaptcha = 'https://ics-static.obs.cn-north-1.myhuaweicloud.com/1.0.2/resources/js/captcha.min.js';

import { icsClientInit } from '@/api/sms';
import { isMobileNumber } from '@/utils/validate';
export default {
  props: {
    mobile: {
      type: String,
      default: ''
    },
    start: {
      type: Number,
      default: 0
    },
    retryIn: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      script: null,
      captchaInit: null,
      visible: false,
      tip: ''
    };
  },
  watch: {
    start() {
      this.timeSpan = this.retryIn;
      this.showTimeLeft();
    }
  },
  mounted() {
    this.loadV2Script().then(() => {
      this.initHWCaptcha(window.ics_client.init());
    });
  },
  methods: {
    loadV2Script() {
      if (typeof window.initHWCaptcha === 'function') {
        return Promise.resolve();
      } else {
        return new Promise(resolve => {
          const script = document.createElement('script');
          script.src = hwCaptcha;
          script.async = true;
          script.onload = script.onreadystatechange = function() {
            if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
              resolve();
              script.onload = script.onreadystatechange = null;
            }
          };
          document.getElementsByTagName('head')[0].appendChild(script);
        });
      }
    },
    initHWCaptcha(data) {
      icsClientInit(data).then(res => {
        window
          .initHWCaptcha({
            ele: document.getElementById('demo-captcha-wraper'),
            type: 1,
            success: token => {
              const data = {
                phoneNo: this.$props.mobile,
                vaptchaToken: token,
                Category: 0
              };
              const _data = JSON.stringify(data);
              this.$emit('input', _data);
            }
          })
          .active(res.data.service_token, res.data.offline);
        document.getElementsByClassName('ics-verify-text')[0].innerHTML = this.$t('action.sendSmsCode');
      });
    },
    showTimeLeft() {
      if (this.timeSpan > 0) {
        this.tip = this.$t('message.smsRetryDelay', [this.timeSpan]);
        setTimeout(this.showTimeLeft, 1000);
      } else {
        this.initHWCaptcha(window.ics_client.init());
        this.tip = this.$t('action.initialization');
      }
      document.getElementsByClassName('ics-verify-success-text')[0].innerHTML = this.tip;
      this.timeSpan--;
    },
    validatePhone() {
      if (!isMobileNumber(this.$props.mobile)) {
        this.$store.dispatch('showError', 'validate.invalidMobileNumber');
        this.initHWCaptcha(window.ics_client.init());
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';

.vw-hwcaptcha {
  margin-bottom: 1.75rem;

  .hw-tip {
    text-align: right;
  }

  .captcha-wraper {
    width: 100% !important;

    .ics-verify-btn {
      border-radius: 3rem;
    }

    .ics-verify-success-btn {
      border-radius: 3rem;
    }

    .ics-verify-text {
      right: calc(50% - 63px);
      font-size: 0.9375rem;
    }

    .ics-success-icon {
      left: calc(50% - 70px);
    }

    .ics-verify-success-text {
      left: calc(50% - 32px);
    }
  }
}
</style>
