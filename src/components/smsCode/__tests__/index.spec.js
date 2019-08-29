/* eslint-env jest */
// Import Vue and the component being tested

import { shallowMount, createLocalVue } from '@vue/test-utils';
import smsCode from '../index.vue';
jest.useFakeTimers();

const localVue = createLocalVue();
localVue.directive('fontColor', jest.fn());
const stubs = ['v-text-field', 'v-btn'];
const $t = jest.fn().mockReturnValue('sms');
const $vuetify = {
  theme: {}
};

describe('@/components/smsCode should ', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(smsCode, {
      localVue,
      stubs,
      mocks: {
        $t,
        $vuetify
      },
      propsData: {
        start: 0,
        retryIn: 60
      }
    });
  });

  it('be initialized', () => {
    expect(cmp.find('.sms-code-input').exists()).toBeTruthy();
  });
  it('generate SMS code', () => {
    cmp.vm.$refs.smsCodeInput.focus = jest.fn();
    // after generating sms code, start timer, and focus sms field
    cmp.setProps({
      start: 1,
      focusTrigger: 1
    });
    expect(cmp.vm.timeSpan).toBe(59);
    expect(cmp.vm.tip).toBe('sms');

    jest.runAllTimers();
    expect(cmp.vm.timeSpan).toBe(-1);
    expect(cmp.vm.tip).toBe('');
  });
  it('enter SMS code', () => {
    jest.spyOn(cmp.vm, '$emit');
    cmp.setData({ value: '123456' });
    cmp.vm.enterSmsCode();
    expect(cmp.vm.value).toBe('123456');
    expect(cmp.vm.$emit).toHaveBeenCalledWith('input', '123456');
  });
  it('send SMS code', () => {
    jest.spyOn(cmp.vm, '$emit');
    cmp.vm.sendSmsCode();
    expect(cmp.vm.$emit).toHaveBeenCalledWith('send');
  });
});
