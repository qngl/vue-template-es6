<template>
  <div class="main-container registration-box">
    <v-layout align-center row justify-center fill-height>
      <v-form ref="form" v-model="valid" lazy-validation class="vw-form">
        <v-card dark flat color="primary">
          <v-card-title class="title">
            <img :src="logo" alt="QNGLAPP" />
          </v-card-title>
          <v-card-text>
            <loading :progress="loading" center />
            <v-text-field
              ref="userName"
              v-model="form.name"
              :placeholder="$t('input.pleaseEnterFullName')"
              :rules="rules.name"
              clearable
              single-line
              outline
              validate-on-blur
              type="text"
            />
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
              ref="password"
              v-model="form.password"
              :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
              :label="$t('input.password')"
              :placeholder="$t('input.pleaseEnterPassword')"
              :rules="rules.password"
              :type="showPassword ? 'text' : 'password'"
              maxlength="16"
              minlength="8"
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
            <captcha v-if="!showVaptcha" :show="refreshCaptcha" :hide="hideCaptcha" @input-code="sendSmsCode" />
            <hw-captcha v-if="showVaptcha" :mobile="form.mobileNumber" :start="sms.start" :retry-in="sms.timeSpan" @input="sendHWSmsCode" />

            <v-checkbox ref="aggreement" v-model="form.aggreement" :rules="rules.aggreement" class="aggreement-input">
              <div slot="label">
                <div class="aggreement-label">
                  {{ $t('login.readAndAgree') }}
                </div>
                <terms-and-conditions />
              </div>
            </v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-btn :style="actionButtonStyle" class="v-btn--action" block light large round @click="save">
              {{ $t('action.register') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import logo from '@/assets/images/logo.svg';
import loading from '@/components/loading';
import smsCode from '@/components/smsCode';
import captcha from '@/components/captcha';
import hwCaptcha from '@/components/hwCaptcha';
import termsAndConditions from './components/termsAndConditions';

import { register } from '@/api/user';
import { sendSmsCode, sendHWSmsCode } from '@/api/sms';
import { isRequired, isMobileNumber, isPassword } from '@/utils/validate';
import { trackEvent } from '@/utils/tracking';

export default {
  name: 'Registration',
  components: {
    loading,
    smsCode,
    captcha,
    hwCaptcha,
    termsAndConditions
  },
  data() {
    return {
      valid: true,
      logo,
      showPassword: false,
      focusSms: 0,
      showVaptcha: window.ENV.ENABLE_VAPTCHA,
      form: {
        name: null,
        mobileNumber: null,
        password: null,
        verificationCode: null,
        aggreement: false,
        isRememberMeChecked: true
      },
      rules: {
        name: [v => isRequired(v) || this.$t('input.fullName') + this.$t('validate.isRequired')],
        mobileNumber: [
          v => isRequired(v) || this.$t('input.mobileNumber') + this.$t('validate.isRequired'),
          v => isMobileNumber(v) || this.$t('validate.invalidMobileNumber')
        ],
        password: [
          v => isRequired(v) || this.$t('input.password') + this.$t('validate.isRequired'),
          v => isPassword(v) || this.$t('validate.invalidPassword')
        ],
        verificationCode: [v => isRequired(v) || this.$t('input.verificationCode') + this.$t('validate.isRequired')],
        aggreement: [v => isRequired(v) || this.$t('validate.mustAgree')]
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
    ...mapGetters(['redirect']),
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
        register(this.form)
          .then(this.handleSuccess)
          .catch(this.handleError);
      }
    },
    handleSuccess() {
      const data = {
        userName: this.form.mobileNumber,
        password: this.form.password
      };
      this.$store.dispatch('login', data).then(() => {
        this.$store.dispatch('showSuccess', 'message.registerSuccessfully');
        if (this.$route.query.redirect && this.redirect) {
          this.$router.replace(this.redirect);
          this.$store.dispatch('removeRedirect');
        } else {
          this.$router.replace({ name: 'homepage' });
        }
      });
      trackEvent('registration', 'success');
      this.loading--;
    },
    handleError(res) {
      if (res.data.errorCode === 409101) {
        this.$store.dispatch('showError', 'message.mobileNumberRegistered');
        this.$emit('error');
      } else if (res.data.errorCode === 400102) {
        this.$store.dispatch('showError', 'message.wrongVerificationCode');
        this.$emit('error');
      } else {
        this.$store.dispatch('showError', 'message.operationFailed');
        this.$emit('error');
      }
      trackEvent('registration', 'error', res.data && res.data.errorCode);
      this.loading--;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';

.main-container.registration-box {
  width: 100%;
  padding-top: 1rem;

  .v-card {
    width: 100%;
  }

  .loading-box {
    .spinner {
      color: $white;
    }
  }

  .vw-form {
    .v-input--checkbox {
      a {
        color: $white;
      }

      .v-label {
        font-size: 0.875rem;
      }

      .aggreement-label {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
</style>
