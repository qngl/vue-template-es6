/* eslint-env jest */
// Import Vue and the component being tested
import { shallowMount, createLocalVue } from '@vue/test-utils';
import resetPasswordForm from '../resetPasswordForm.vue';
//import { updatePassword } from '@/api/user';
import { sendSmsCode } from '@/api/sms';

import logo from '@/assets/images/logo.svg';

jest.mock('@/components/loading', () => {
  return jest.fn();
});
jest.mock('@/components/smsCode', () => {
  return jest.fn();
});
jest.mock('@/components/captcha', () => {
  return jest.fn();
});
jest.mock('@/assets/images/logo.svg', () => 'logo');
jest.mock('@/api/user', () => {
  return {
    updatePassword: jest.fn(() => Promise.resolve({ data: {} }))
  };
});
jest.mock('@/api/sms', () => {
  return {
    sendSmsCode: jest.fn(() => Promise.resolve({ data: {} })),
    sendHWSmsCode: jest.fn(() => Promise.resolve())
  };
});
jest.mock('@/utils/validate', () => {
  return {
    isRequired: jest.fn(() => Promise.resolve({ data: true })),
    isMobileNumber: jest.fn(() => Promise.resolve({ data: true })),
    isPassword: jest.fn(() => Promise.resolve({ data: true }))
  };
});

window.ENV = {
  ENABLE_VAPTCHA: true
};
const localVue = createLocalVue();
localVue.directive('loading', jest.fn());
const $router = {
  push: jest.fn()
};
const $store = {
  dispatch: jest.fn()
};
const $vuetify = {
  theme: {}
};
const $t = jest.fn();
const stubs = [
  'v-form',
  'v-card',
  'v-card-title',
  'v-card-text',
  'loading',
  'v-text-field',
  'sms-code',
  'captcha',
  'hw-captcha',
  'v-card-actions',
  'v-btn',
  'v-layout'
];
const $route = {
  query: {}
};

describe('resetPasswordForm.vue should', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(resetPasswordForm, {
      localVue,
      mocks: {
        $router,
        $route,
        $store,
        $t,
        $vuetify
      },
      stubs
    });
  });

  afterEach(() => {
    cmp.destroy();
  });

  it('be initialized correctly', () => {
    expect(cmp).toBeDefined();
    expect(cmp.vm).toBeDefined();
    expect(cmp.vm.valid).toBeTruthy();
    expect(cmp.vm.logo).toEqual(logo);
    expect(cmp.vm.showPassword).toBeFalsy();
    expect(cmp.vm.focusSms).toEqual(0);
    expect(cmp.vm.form).toBeDefined();
    expect(cmp.vm.loading).toEqual(0);
    expect(cmp.vm.sms).toBeDefined();
    expect(cmp.vm.refreshCaptcha).toEqual(0);
    expect(cmp.vm.hideCaptcha).toEqual(0);
    const spySendSmsCode = jest.spyOn(cmp.vm, 'sendSmsCode');
    expect(spySendSmsCode).toBeDefined();
  });

  it('set formData', () => {
    cmp.vm.form = {
      mobileNumber: 18234567896,
      password: 666666,
      verificationCode: 54365
    };
    cmp.vm.$refs['form'].validate = function(cb) {
      cb(true);
    };
  });

  // it('show captchaDialog if ref[mobileNumber] validate', () => {
  //   cmp.vm.form = {
  //     mobileNumber: 18234567896
  //   };
  //   cmp.vm.showCaptchaDialog();
  //   cmp.vm.$refs['mobileNumber'].validate = function() {};
  //   Vue.nextTick(() => {
  //     expect(cmp.vm.emitted().focus).toBeTruthy();
  //     expect(cmp.vm.emitted().focus.length).toBe(1);
  //   });
  // });

  // it('show captchaDialog elseIf ref[mobileNumber] invalidate', () => {
  //   cmp.vm.showCaptchaDialog();
  //   cmp.vm.$refs['mobileNumber'].validate = function() {};
  //   Vue.nextTick(() => {
  //     const mobileNumber = cmp.vm.find({ ref: 'mobileNumber' });
  //     mobileNumber.focus();
  //   });
  //   expect($store.dispatch).toHaveBeenCalledWith('showError', 'validate.invalidMobileNumber');
  // });

  it('send smsCode if response.data.checkResult === 1', () => {
    const imageCode = 57557;
    cmp.vm.sms.sending = true;
    cmp.vm.sendSmsCode(imageCode);
    cmp.vm.sms.start++;
    cmp.vm.sms.timeSpan = 60;
    cmp.vm.hideCaptcha++;
    expect(sendSmsCode).toHaveBeenCalled();
  });

  it('enterSmsCode', () => {
    cmp.vm.enterSmsCode(3355);
    cmp.vm.verificationCode = 3355;
  });

  // it('save formData if this.$refs[form] validate', () => {
  //   cmp.vm.form = {
  //     password: 666666
  //   };
  //   cmp.vm.save();
  //   expect(updatePassword).toHaveBeenCalledWith(cmp.vm.form);
  // });

  it('handleSuccess', () => {
    cmp.vm.handleSuccess();
    expect($store.dispatch).toHaveBeenCalledWith('showSuccess', 'message.resetPasswordSuccessfully');
  });

  it('handleError', () => {
    cmp.vm.handleError();
    expect($store.dispatch).toHaveBeenCalledWith('showError', 'message.operationFailed');
  });

  it('register', () => {
    cmp.vm.register();
    expect($router.push).toHaveBeenCalledWith({ name: 'registration', query: {} });
  });

  it('login', () => {
    cmp.vm.login();
    expect($router.push).toHaveBeenCalledWith({ name: 'login', query: {} });
  });
});
