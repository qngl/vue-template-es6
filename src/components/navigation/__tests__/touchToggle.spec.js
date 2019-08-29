/* eslint-env jest */
// Import Vue and the component being tested

import { shallowMount, createLocalVue } from '@vue/test-utils';
import touchToggle from '../touchToggle.vue';

const localVue = createLocalVue();
localVue.directive('touch', jest.fn());
const $store = {
  dispatch: jest.fn()
};

describe('@/components/navigation/touchToggle should', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(touchToggle, {
      localVue,
      mocks: {
        $store
      }
    });
  });

  it('be initialized and emulate swiping left and right', () => {
    cmp.vm.drawerTouch.left();
    expect(cmp.vm.$store.dispatch).toHaveBeenCalledWith('toggleSideBar');
    cmp.vm.drawerTouch.right();
    expect(cmp.vm.$store.dispatch).toHaveBeenCalledWith('toggleSideBar');
  });
});
