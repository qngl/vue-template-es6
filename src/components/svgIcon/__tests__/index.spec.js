/* eslint-env jest */
// Import Vue and the component being tested

import { shallowMount, createLocalVue } from '@vue/test-utils';
import svgIcon from '../index.vue';

const localVue = createLocalVue();
const stubs = [];

describe('@/components/svgIcon should ', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(svgIcon, {
      localVue,
      stubs,
      propsData: {
        iconClass: 'car',
        className: 'v-icon'
      }
    });
  });

  it('be initialized', () => {
    expect(cmp.vm.iconName).toBe('#icon-car');
    expect(cmp.vm.svgClass).toBe('svg-icon v-icon');

    cmp.setProps({
      className: ''
    });
    expect(cmp.vm.svgClass).toBe('svg-icon');
  });
});
