/* eslint-env jest */
// Import Vue and the component being tested

import { shallowMount, createLocalVue } from '@vue/test-utils';
import tipMessage from '../index.vue';

const localVue = createLocalVue();
const stubs = ['slot'];

describe('@/components/tipMessage should ', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(tipMessage, {
      localVue,
      stubs,
      propsData: {
        error: true
      }
    });
  });

  it('be initialized and render a slot', () => {
    expect(cmp.find('.tip-message').exists()).toBeTruthy();
    expect(cmp.find('.error-msg').exists()).toBeTruthy();
  });
});
