/* eslint-env jest */
// Import Vue and the component being tested
import { shallowMount, createLocalVue } from '@vue/test-utils';
import loading from '../index.vue';

jest.mock('@/components/svgIcon', () => {
  return jest.fn();
});

const localVue = createLocalVue();
const stubs = ['svg-icon'];
const propsData = {
  progress: 1,
  center: true
};
const propsData2 = {
  progress: 0,
  center: true
};

describe('@/components/loading should', () => {
  let cmp;

  it('be initialized', () => {
    cmp = shallowMount(loading, {
      attachToDocument: true,
      localVue,
      propsData,
      stubs
    });
    expect(cmp.find('.loading-box').exists()).toBeTruthy();
    expect(cmp.find('.center').exists()).toBeTruthy();
    cmp.setProps(propsData2);
    expect(cmp.find('.loading-box').exists()).toBeFalsy();
  });
});
