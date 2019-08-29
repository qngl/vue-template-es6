<template>
  <v-form ref="form" v-model="valid" lazy-validation class="vw-form">
    <v-card dark flat color="primary">
      <v-card-title class="title">
        <img :src="logo" alt="QNGLAPP" />
      </v-card-title>
      <v-card-text>
        <loading :progress="loading" center />
        <v-text-field
          ref="mobileNumber"
          v-model="form.mobileNumber"
          :placeholder="$t('input.pleaseEnterMobileNumber')"
          :rules="rules.mobileNumber"
          clearable
          mask="### #### ####"
          pattern="[0-9]*"
          single-line
          outline
          validate-on-blur
          type="tel"
        />
        <div class="pl-3">
          {{ $t('login.resetPasswordWithSmsCode') }}
        </div>
        <v-text-field
          v-model="form.password"
          :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
          :label="$t('input.password')"
          :placeholder="$t('input.pleaseEnterPassword')"
          :rules="rules.password"
          :type="showPassword ? 'text' : 'password'"
          single-line
          outline
          validate-on-blur
          @click:append="showPassword = !showPassword"
        />
        <sms-code
          v-model="form.verificationCode"
          :retry-in="sms.timeSpan"
          :rules="rules.verificationCode"
          :sending="sms.sending"
          :start="sms.start"
          :focus-trigger="focusSms"
          :is-btn="!showVaptcha"
          @send="showCaptchaDialog"
          @input="enterSmsCode"
        />
        <captcha :show="refreshCaptcha" :hide="hideCaptcha" @input-code="sendSmsCode" />
        <hw-captcha v-if="showVaptcha" :mobile="form.mobileNumber" :start="sms.start" :retry-in="sms.timeSpan" @input="sendHWSmsCode" />
      </v-card-text>
      <v-card-actions>
        <v-btn :style="actionButtonStyle" class="v-btn--action" block light large round @click="save">
          {{ $t('action.save') }}
        </v-btn>
      </v-card-actions>
      <v-layout justify-space-between row class="px-4">
        <span @click="login">
          {{ $t('login.backToLogin') }}
        </span>
        <span @click="register">
          {{ $t('login.register') }}
        </span>
      </v-layout>
    </v-card>
  </v-form>
</template>

<script>
import logo from '@/assets/images/logo.svg';
import loading from '@/components/loading';
import smsCode from '@/components/smsCode';
import captcha from '@/components/captcha';
import hwCaptcha from '@/components/hwCaptcha';

import { updatePassword } from '@/api/user';
import { sendSmsCode, sendHWSmsCode } from '@/api/sms';
import { isRequired, isMobileNumber, isPassword } from '@/utils/validate';

export default {
  name: 'ResetPassowrdForm',
  components: {
    loading,
    smsCode,
    captcha,
    hwCaptcha
  },
  data() {
    return {
      valid: true,
      logo: logo,
      showPassword: false,
      focusSms: 0,
      showVaptcha: window.ENV.ENABLE_VAPTCHA,
      form: {
        mobileNumber: null,
        password: null,
        verificationCode: null,
        scope: 0
      },
      rules: {
        mobileNumber: [
          v => isRequired(v) || this.$t('input.mobileNumber') + this.$t('validate.isRequired'),
          v => isMobileNumber(v) || this.$t('input.mobileNumber') + this.$t('validate.invalidMobileNumber')
        ],
        password: [
          v => isRequired(v) || this.$t('input.password') + this.$t('validate.isRequired'),
          v => isPassword(v) || this.$t('validate.invalidPassword')
        ],
        verificationCode: [v => isRequired(v) || this.$t('input.verificationCode') + this.$t('validate.isRequired')]
      },
      loading: 0,
      sms: {
        timeSpan: 0,
        start: 0,
        sending: false
      },
      refreshCaptcha: 0,
      hideCaptcha: 0
    };
  },
  computed: {
    actionButtonStyle() {
      return {
        color: this.$vuetify.theme.primary
      };
    }
  },
  methods: {
    showCaptchaDialog() {
      if (this.$refs.mobileNumber.validate()) {
        this.refreshCaptcha++;
        this.$nextTick(() => {
          this.$emit('focus');
        });
      } else {
        this.$nextTick(() => {
          this.$refs.mobileNumber.focus();
        });
        this.$store.dispatch('showError', 'validate.invalidMobileNumber');
      }
    },
    sendHWSmsCode(data) {
      this.sms.sending = true;
      sendHWSmsCode(data).then(response => {
        this.form.encryptedVerificationCode = response.data.EncryptedMessage;
        this.$store.dispatch('showSuccess', 'message.successfulSmsCheck');
        this.sms.start++;
        this.sms.timeSpan = 60;
        this.hideCaptcha++;
        this.sms.sending = false;
      });
    },
    sendSmsCode(imageCode) {
      this.sms.sending = true;
      sendSmsCode({ mobileNumber: this.form.mobileNumber, securityId: imageCode.securityId, securityCode: imageCode.securityCode }).then(
        response => {
          if (response.data.checkResult === 1) {
            this.sms.start++;
            this.sms.timeSpan = 60;
            this.hideCaptcha++;
            this.$nextTick(() => {
              this.focusSms++;
            });
          } else {
            this.refreshCaptcha++;
            this.$store.dispatch('showError', 'message.invalidImageVerificationCode');
          }
          this.sms.sending = false;
        }
      );
    },
    enterSmsCode(value) {
      this.form.verificationCode = value;
    },
    save() {
      if (this.$refs.form.validate()) {
        this.loading++;
        updatePassword(this.form)
          .then(this.handleSuccess)
          .catch(this.handleError);
      }
    },
    handleSuccess() {
      this.loading--;
      this.$store.dispatch('showSuccess', 'message.resetPasswordSuccessfully');
      this.$emit('success');
    },
    handleError() {
      this.loading--;
      this.$store.dispatch('showError', 'message.operationFailed');
      this.$emit('error');
    },
    register() {
      this.$router.push({ name: 'registration', query: this.$route.query });
    },
    login() {
      this.$router.push({ name: 'login', query: this.$route.query });
    }
  }
};
</script>
