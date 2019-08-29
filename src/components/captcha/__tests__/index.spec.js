/* eslint-env jest */
// Import Vue and the component being tested

import { getImageCode } from '@/api/sms';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import captcha from '../index.vue';

jest.mock('@/components/loading', () => {
  return jest.fn();
});
jest.mock('@/assets/images/refresh.svg', () => 'xwerw');
jest.mock('@/api/sms', () => {
  return {
    getImageCode: jest.fn(() => Promise.resolve({ data: { securityId: 'abc', imageContent: 'ag' } }))
  };
});

const localVue = createLocalVue();
localVue.directive('fontColor', jest.fn());
const propsData = {
  show: 0,
  hide: 0
};
const propsDataShow = {
  show: 1,
  hide: 0
};
const propsDataHide = {
  show: 0,
  hide: 1
};
const $vuetify = {
  theme: {}
};
const mocks = {
  $t: jest.fn(),
  $vuetify
};
const stubs = ['loading', 'v-dialog', 'v-card', 'v-card-text', 'v-text-field', 'v-img', 'v-btn', 'v-icon'];

describe('@/components/captcha should', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(captcha, {
      localVue,
      mocks,
      propsData,
      stubs
    });
  });

  it('be initialized', () => {
    expect(cmp.vm).toBeDefined();
    expect(cmp.vm.refresh).toBeDefined();
    expect(cmp.vm.visible).toBeDefined();
  });

  it('watch props hide', () => {
    cmp.vm.value = '0934';
    cmp.vm.visible = true;
    cmp.setProps(propsDataHide);
    expect(cmp.vm.value).toBeNull();
    expect(cmp.vm.visible).toBeFalsy();
  });

  it('watch props show', () => {
    cmp.vm.value = '0934';
    cmp.vm.visible = false;
    cmp.vm.$refs.captchaInput.focus = jest.fn();
    cmp.setProps(propsDataShow);
    expect(cmp.vm.value).toBeNull();
    expect(cmp.vm.visible).toBeTruthy();
    expect(getImageCode).toHaveBeenCalled();
  });

  it('getImageCode from API', async () => {
    await cmp.vm.getImageCode();
    expect(getImageCode).toHaveBeenCalled();
    expect(cmp.vm.codeImage).toBeDefined();
    expect(cmp.vm.securityId).toBeDefined();
  });

  it('enterCaptcha', () => {
    cmp.vm.value = '0934';
    cmp.vm.securityId = 'abc';
    cmp.vm.enterCaptcha();
    expect(cmp.emitted()['input-code'][0]).toEqual([{ securityId: 'abc', securityCode: '0934' }]);
  });
});
