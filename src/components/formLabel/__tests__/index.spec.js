/* eslint-env jest */
// Import Vue and the component being tested
import { shallowMount, createLocalVue } from '@vue/test-utils';
import formLabel from '../index.vue';

const localVue = createLocalVue();
const propsData2 = {
  required: true
};
const stubs = ['slot'];

describe('@/components/formLabel should', () => {
  let cmp;

  it('be initialized without required', () => {
    cmp = shallowMount(formLabel, {
      localVue,
      stubs
    });
    expect(cmp.find('.form-label').exists()).toBeTruthy();
    expect(cmp.find('.required').exists()).toBeFalsy();
  });

  it('be initialized with required', () => {
    cmp = shallowMount(formLabel, {
      localVue,
      propsData: propsData2,
      stubs
    });
    expect(cmp.find('.form-label').exists()).toBeTruthy();
    expect(cmp.find('.required').exists()).toBeTruthy();
  });
});
