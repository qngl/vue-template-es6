/* eslint-env jest */
// Import Vue and the component being tested

import { shallowMount, createLocalVue } from '@vue/test-utils';
import step from '../step.vue';

const localVue = createLocalVue();
const stubs = ['svg-icon', 'v-icon'];
const $vuetify = {
  theme: {}
};

describe('@/components/steps/step should ', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(step, {
      localVue,
      stubs,
      mocks: {
        $vuetify
      },
      propsData: {
        current: 0,
        index: 0,
        icon: '',
        svgIcon: 'car',
        label: 'Choose a car'
      }
    });
  });

  it('be initialized if svg', () => {
    expect(cmp.find('.step-icon').exists()).toBeTruthy();
    expect(cmp.find('.active').exists()).toBeTruthy();
    expect(cmp.vm.complete).toBeTruthy();
    expect(cmp.vm.isSvgIcon).toBeTruthy();
    expect(cmp.vm.label).toBe('Choose a car');
  });
  it('be initialized if normal icon', () => {
    cmp.setProps({
      icon: 'test.png',
      svgIcon: ''
    });
    expect(cmp.vm.isSvgIcon).toBeFalsy();
  });
});
