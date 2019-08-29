/* eslint-env jest */
// Import Vue and the component being tested

import { shallowMount, createLocalVue } from '@vue/test-utils';
import steps from '../index.vue';

const localVue = createLocalVue();
const stubs = ['v-layout', 'v-divider', 'step'];
const $t = jest.fn();
const $vuetify = {
  theme: {}
};
const $store = {
  getters: {
    theme: ''
  },
  dispatch: jest.fn()
};

describe('@/components/steps/index should ', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(steps, {
      localVue,
      stubs,
      mocks: {
        $t,
        $vuetify,
        $store
      },
      propsData: {
        step: 0
      }
    });
  });

  it('be initialized', () => {
    expect(cmp.find('.steps-box').exists()).toBeTruthy();
    expect(cmp.vm.steps.length).toBe(5);
  });
});
