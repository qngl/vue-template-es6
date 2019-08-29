/* eslint-env jest */
// Import Vue and the component being tested
import { shallowMount, createLocalVue } from '@vue/test-utils';
import loginForm from '../loginForm.vue';
// import { sendSmsCode, sendHWSmsCode } from '@/api/sms';
// import { isRequired, isMobileNumber } from '@/utils/validate';
//import { trackEvent } from '@/utils/tracking';
import loading from '@/components/loading';
import smsCode from '@/components/smsCode';
import captcha from '@/components/captcha';
import hwCaptcha from '@/components/hwCaptcha';

jest.mock('@/components/smsCode', () => {
  return jest.fn();
});
jest.mock('@/components/captcha', () => {
  return jest.fn();
});
jest.mock('@/components/hwCaptcha', () => {
  return jest.fn();
});
jest.mock('@/api/sms', () => {
  return {
    sendSmsCode: jest.fn(() => Promise.resolve()),
    sendHWSmsCode: jest.fn(() => Promise.resolve())
  };
});
jest.mock('@/utils/validate', () => {
  return {
    isRequired: jest.fn(() => Promise.resolve({ data: true })),
    isMobileNumber: jest.fn(() => Promise.resolve({ data: true }))
  };
});
jest.mock('@/utils/tracking', () => {
  return {
    trackEvent: jest.fn(() => Promise.resolve())
  };
});
window.ENV = {
  ENABLE_VAPTCHA: true
};
const $route = {
  query: {
    redirect: true
  }
};
const $router = {
  push: jest.fn()
};
const $vuetify = {
  theme: {}
};
const $store = {
  dispatch: jest.fn()
};
const localVue = createLocalVue();
localVue.directive('loading', jest.fn());
const $t = jest.fn();
const stubs = [
  'v-form',
  'v-card',
  'v-card-title',
  'v-card-text',
  'v-text-field',
  'loading',
  'sms-code',
  'captcha',
  'hw-captcha',
  'v-card-actions',
  'v-btn',
  'v-layout'
];

describe('loginForm.vue should', () => {
  let cmp;
  beforeEach(() => {
    cmp = shallowMount(loginForm, {
      localVue,
      mocks: {
        $t,
        $route,
        $router,
        $store,
        $vuetify
      },
      stubs
    });
  });

  it('be initialized correctly', () => {
    expect(cmp.vm).toBeDefined();
    expect(cmp.vm.logo).toBeDefined();
    expect(loading).toBeDefined();
    expect(smsCode).toBeDefined();
    expect(captcha).toBeDefined();
    expect(hwCaptcha).toBeDefined();
  });

  // it('switch Login Mode', () => {
  //   cmp.vm.switchLoginMode();
  // });

  it('show Captcha Dialog', () => {
    cmp.vm.showCaptchaDialog();
  });

  it('handleSuccess', () => {
    cmp.vm.handleSuccess();
    expect($store.dispatch).toHaveBeenCalledWith('showSuccess', 'message.welcomeBack');
  });

  it('register', () => {
    cmp.vm.register();
    expect(cmp.vm.$router.push).toHaveBeenCalledWith({ name: 'registration', query: { redirect: true } });
  });

  it('resetPassword', () => {
    cmp.vm.resetPassword();
    expect(cmp.vm.$router.push).toHaveBeenCalledWith({ name: 'resetPassword', query: { redirect: true } });
  });
});
