<template>
  <v-form ref="form" v-model="valid" class="vw-form">
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
        <v-text-field
          v-if="loginMode === LOGIN_MODE_PSW"
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
          v-if="loginMode === LOGIN_MODE_SMS"
          v-model="form.verificationCode"
          :retry-in="sms.timeSpan"
          :rules="rules.verificationCode"
          :sending="sms.sending"
          :start="sms.start"
          :is-btn="!showVaptcha"
          @send="showCaptchaDialog"
          @input="enterSmsCode"
        />
        <captcha v-if="!showVaptcha" :show="refreshCaptcha" :hide="hideCaptcha" @input-code="sendSmsCode" />
        <hw-captcha
          v-if="loginMode === LOGIN_MODE_SMS && showVaptcha"
          :mobile="form.mobileNumber"
          :start="sms.start"
          :retry-in="sms.timeSpan"
          @input="sendHWSmsCode"
        />

        <!--v-checkbox
          v-model="form.isRememberMeChecked"
          :label="$t('input.rememberMe')"
          dark
        /-->
      </v-card-text>
      <v-card-actions>
        <v-btn :style="actionButtonStyle" class="v-btn--action" block light large round @click="login">
          {{ $t('action.login') }}
        </v-btn>
      </v-card-actions>
      <v-layout justify-space-between row class="px-4">
        <span v-if="loginMode === LOGIN_MODE_PSW" @click="switchLoginMode(1)">
          {{ $t('login.loginWithSms') }}
        </span>
        <span v-if="loginMode === LOGIN_MODE_SMS" @click="switchLoginMode(2)">
          {{ $t('login.loginWithPassword') }}
        </span>
        <span v-if="loginMode === LOGIN_MODE_PSW" @click="resetPassword">
          {{ $t('login.forgetPassword') }}
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

import { sendSmsCode, sendHWSmsCode } from '@/api/sms';
import { isRequired, isMobileNumber } from '@/utils/validate';
import { trackEvent } from '@/utils/tracking';

const LOGIN_MODE_SMS = 1;
const LOGIN_MODE_PSW = 2;

export default {
  name: 'LoginForm',
  components: {
    loading,
    smsCode,
    captcha,
    hwCaptcha
  },
  data() {
    return {
      LOGIN_MODE_SMS: LOGIN_MODE_SMS,
      LOGIN_MODE_PSW: LOGIN_MODE_PSW,
      logo: logo,
      valid: false,
      loginMode: LOGIN_MODE_SMS,
      showPassword: false,
      focusSms: 0,
      encryptedMsg: null,
      showVaptcha: window.ENV.ENABLE_VAPTCHA,
      form: {
        mobileNumber: null,
        password: null,
        verificationCode: null,
        isRememberMeChecked: null
      },
      rules: {
        mobileNumber: [
          v => isRequired(v) || this.$t('input.mobileNumber') + this.$t('validate.isRequired'),
          v => isMobileNumber(v) || this.$t('validate.invalidMobileNumber')
        ],
        password: [v => isRequired(v) || this.$t('input.password') + this.$t('validate.isRequired')],
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
    currentTitle() {
      return this.loginMode === LOGIN_MODE_SMS ? this.$t('login.loginWithSms') : this.$t('login.loginWithPassword');
    },
    actionButtonStyle() {
      return {
        color: this.$vuetify.theme.primary
      };
    },
    theme() {
      return this.$route.query.theme;
    }
  },
  methods: {
    switchLoginMode(value) {
      this.loginMode = value;
      this.$refs.form.reset();
    },
    showCaptchaDialog() {
      if (isMobileNumber(this.form.mobileNumber)) {
        this.refreshCaptcha++;
        this.$nextTick(() => {
          this.$emit('focus');
        });
      } else {
        this.$store.dispatch('showError', 'validate.invalidMobileNumber');
      }
    },
    sendHWSmsCode(data) {
      this.sms.sending = true;
      sendHWSmsCode(data).then(response => {
        this.encryptedMsg = response.data.EncryptedMessage;
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
    login() {
      if (this.$refs.form.validate()) {
        this.loading++;
        const data = { userName: this.form.mobileNumber };
        if (this.loginMode === LOGIN_MODE_SMS) {
          data.verificationCode = this.form.verificationCode;
        } else if (this.loginMode === LOGIN_MODE_PSW) {
          data.password = this.form.password;
        }
        if (this.showVaptcha) {
          data.encryptedVerificationCode = this.encryptedMsg;
        }

        this.$store
          .dispatch('login', data)
          .then(this.handleSuccess)
          .catch(this.handleError);
      }
    },
    handleSuccess() {
      this.loading--;
      this.$store.dispatch('showSuccess', 'message.welcomeBack');
      this.$emit('success');
      trackEvent('login', 'success');
    },
    handleError(error) {
      this.loading--;
      let title = '';
      let content = '';
      if (this.loginMode === LOGIN_MODE_SMS) {
        title = 'message.wrongMobileNumberOrSmsCode';
      } else {
        title = 'message.wrongMobileNumberOrPassword';
      }

      if (error.data && error.data.errorCode) {
        if (error.data.errorCode === 401102) {
          content = 'message.accountWillBeLocked';
        } else if (error.data.errorCode === 401106) {
          content = 'message.accountHassBeenLocked';
        } else if (error.data.errorCode === 404101) {
          content = 'message.notRegisteredUser';
        }
      }
      this.$store.dispatch('showError', { content, title });
      this.$emit('error');
      trackEvent('login', 'error', error.status, error.data && error.data.errorCode);
    },
    register() {
      this.$router.push({ name: 'registration', query: this.$route.query });
    },
    resetPassword() {
      this.$router.push({ name: 'resetPassword', query: this.$route.query });
    }
  }
};
</script>
