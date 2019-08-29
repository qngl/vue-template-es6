/* eslint-env jest */
// Import Vue and the component being tested

import { shallowMount, createLocalVue } from '@vue/test-utils';
import backButton from '../backButton.vue';

const localVue = createLocalVue();
const $router = {
  back: jest.fn()
};
const stubs = ['v-icon'];

describe('@/components/navigation/backButton should', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(backButton, {
      localVue,
      mocks: {
        $router
      },
      stubs
    });
  });

  it('be initialized and call back button', () => {
    expect(cmp.find('.back-btn').exists()).toBeTruthy();
    cmp.vm.back();
    expect(cmp.vm.$router.back).toHaveBeenCalled();
  });
});
