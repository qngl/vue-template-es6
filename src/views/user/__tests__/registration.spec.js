/* eslint-env jest */
// Import Vue and the component being tested
import { shallowMount, createLocalVue } from '@vue/test-utils';
//import Vue from 'Vue';
import Vuex from 'vuex';
import registration from '../registration.vue';
import termsAndConditions from '../components/termsAndConditions';
import loading from '@/components/loading';
import smsCode from '@/components/smsCode';
import captcha from '@/components/captcha';
import { isRequired, isMobileNumber, isPassword } from '@/utils/validate';
//import { register } from '@/api/user';

jest.mock('../components/termsAndConditions', () => {
  return jest.fn();
});
jest.mock('@/components/smsCode', () => {
  return jest.fn();
});
jest.mock('@/components/captcha', () => {
  return jest.fn();
});
jest.mock('@/components/loading', () => {
  return jest.fn();
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
const $router = {
  replace: jest.fn()
};
const $route = {
  query: {
    redirect: true
  }
};
const $vuetify = {
  theme: {}
};
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.directive('loading', jest.fn());
const $t = jest.fn();
const fakeStore = new Vuex.Store({
  getters: {
    redirect: () => true
  }
});
const $store = {
  dispatch: jest.fn(() => Promise.resolve())
};
const stubs = [
  'v-layout',
  'v-form',
  'v-card',
  'v-card-title',
  'v-card-text',
  'loading',
  'v-text-field',
  'sms-code',
  'captcha',
  'v-checkbox',
  'terms-and-conditions',
  'v-card-actions',
  'v-btn'
];

describe('registration.vue should', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(registration, {
      localVue,
      store: fakeStore,
      mocks: {
        $t,
        $store,
        $router,
        $route,
        $vuetify
      },
      stubs
    });
  });

  afterEach(() => {
    cmp.destroy();
  });

  it('be initialized correctly', () => {
    expect(cmp.vm).toBeDefined();
    expect(registration).toBeDefined();
    expect(termsAndConditions).toBeDefined();
    expect(loading).toBeDefined();
    expect(smsCode).toBeDefined();
    expect(captcha).toBeDefined();
    expect(cmp.vm.logo).toBeDefined();
    expect(isRequired).toBeDefined();
    expect(isMobileNumber).toBeDefined();
    expect(isPassword).toBeDefined();
  });

  // it('show Captcha Dialog if this.$refs.mobileNumber.validate()', () => {
  //   cmp.vm.showCaptchaDialog();
  //   cmp.vm.$refs.mobileNumber.validate = jest.fn(() => Promise.resolve({ data: true }));
  //   cmp.vm.$emit = jest.fn();
  //   Vue.nextTick(() => {
  //     expect(cmp.vm.$emit).toHaveBeenCalledWith('focus');
  //   });
  // });

  // it('save', () => {
  //   cmp.vm.save();
  //   cmp.vm.form = {
  //     mobileNumber: 18234567896,
  //     password: 666666,
  //     verificationCode: 54365
  //   };
  //   cmp.vm.$refs['form'].validate = function(cb) {
  //     cb(true);
  //   };
  //   expect(register).toHaveBeenCalledWith(cmp.vm.form);
  // });

  // it('handleSuccess if this.$route.query.redirect', () => {
  //   cmp.vm.form = {
  //     mobileNumber: '182222222',
  //     password: '123456'
  //   };
  //   const data = {
  //     userName: cmp.vm.form.mobileNumber,
  //     password: cmp.vm.form.password
  //   };
  //   cmp.vm.$route.query.redirect = true;
  //   cmp.vm.redirect = true;

  //   cmp.vm.handleSuccess();
  //   expect($store.dispatch).toHaveBeenCalledWith('login', data);
  //   expect($store.dispatch).toHaveBeenCalledWith('showSuccess', 'message.registerSuccessfully');
  //   expect($router.replace).toHaveBeenCalledWith(cmp.vm.redirect);
  //   expect($store.dispatch).toHaveBeenCalledWith('removeRedirect');
  // });

  // it('handleSuccess elseIf this.$route.query.noRedirect', () => {
  //   cmp.vm.form = {
  //     mobileNumber: '182222222',
  //     password: '123456'
  //   };
  //   const data = {
  //     userName: cmp.vm.form.mobileNumber,
  //     password: cmp.vm.form.password
  //   };
  //   cmp.vm.$route.query.redirect = false;
  //   cmp.vm.redirect = false;

  //   cmp.vm.handleSuccess();
  //   expect(cmp.vm.$store.dispatch).toHaveBeenCalledWith('login', data);
  //   expect(cmp.vm.$store.dispatch).toHaveBeenCalledWith('showSuccess', 'message.registerSuccessfully');
  //   expect(cmp.vm.$router.replace).toHaveBeenCalledWith({ name: 'homepage' });
  // });
});
