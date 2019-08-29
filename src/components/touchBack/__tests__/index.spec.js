/* eslint-env jest */
// Import Vue and the component being tested

import { shallowMount, createLocalVue } from '@vue/test-utils';
import touchBack from '../index.vue';

const localVue = createLocalVue();
localVue.directive('touch', () => {});

describe('@/components/touchBack should ', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(touchBack, {
      localVue
    });

    jest.spyOn(window.history, 'back');
  });

  it('be initialized', () => {
    expect(cmp.find('.touch-back').exists()).toBeTruthy();
    cmp.vm.backTouch.right();
    expect(window.history.back).toHaveBeenCalled();
  });
});
