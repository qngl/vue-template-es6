/* eslint-env jest */
// Import Vue and the component being tested

import { shallowMount, createLocalVue } from '@vue/test-utils';
import scrollTo from '../index.vue';
jest.useFakeTimers();

const localVue = createLocalVue();
const stubs = ['v-btn', 'v-icon'];

describe('@/components/scrollTo should', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(scrollTo, {
      localVue,
      propsData: {
        visibilityHeight: 200,
        backPosition: 50,
        transitionName: 'fade'
      },
      stubs,
      attachToDocument: true
    });

    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => {
      // mock requestAnimationFrame callback
      cmp.vm.smoothScrollUp();
    });
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
  });

  it('be initialized', () => {
    expect(cmp.props().visibilityHeight).toBe(200);
    expect(cmp.props().backPosition).toBe(50);
    expect(cmp.props().transitionName).toBe('fade');
    expect(cmp.vm.container).toBe(document.documentElement);
    expect(cmp.vm.trigger).toBe(document.body);
  });
  it('trigger scroll and handle scroll', () => {
    // mock scrolling less than the threshold
    cmp.vm.trigger.onscroll();
    cmp.vm.container.scrollTop = 100;
    jest.runAllTimers();
    expect(cmp.vm.visible).toBeFalsy();
    // mock scrolling more than the threshold
    cmp.vm.trigger.onscroll();
    cmp.vm.container.scrollTop = 600;
    jest.runAllTimers();
    expect(cmp.vm.visible).toBeTruthy();
  });
  it('scroll to top', () => {
    // start position
    cmp.vm.container.scrollTop = 500;
    cmp.vm.scrollTo();
    expect(window.requestAnimationFrame).toHaveBeenCalled();
    // end position
    expect(cmp.vm.container.scrollTop).toBe(0);
  });
  it('run beforeDestroy lifecycle hook', () => {
    cmp.destroy();
  });
});
