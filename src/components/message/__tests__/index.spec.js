/* eslint-env jest */
// Import Vue and the component being tested

import { shallowMount, createLocalVue } from '@vue/test-utils';
import message from '../index.vue';

jest.useFakeTimers();

const localVue = createLocalVue();
const $store = {
  getters: {
    message: {
      type: 'error',
      title: 'Successfully',
      content: 'Done'
    }
  },
  dispatch: jest.fn()
};
const $t = jest.fn();
const stubs = ['v-snackbar', 'v-alert'];

describe('@/components/message should', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(message, {
      localVue,
      mocks: {
        $store,
        $t
      },
      stubs
    });
  });

  it('be initialized', () => {
    expect(cmp.find('.notification-box').exists()).toBeTruthy();
    expect(cmp.find('.notification-box--title').exists()).toBeTruthy();
    expect(cmp.find('.notification-box--content').exists()).toBeTruthy();
  });

  it('clearLastMessage and scheduleTimeout', () => {
    cmp.vm.lastClearTask = 3;
    cmp.vm.clearLastMessage();
    expect(clearTimeout).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalled();
  });

  it('clearLastMessage to scheduleTimeout', () => {
    cmp.vm.lastClearTask = void 0;
    cmp.vm.clearLastMessage();
    expect(setTimeout).toHaveBeenCalled();
  });

  it('scheduleTimeout', () => {
    cmp.vm.scheduleTimeout();
    expect(setTimeout).toHaveBeenCalled();
    jest.runAllTimers();

    expect($store.dispatch).toHaveBeenCalledWith('clearMessage');
    expect(cmp.vm.lastClearTask).toBeNull();
  });

  it('watch message to null', () => {
    $store.getters.message = null;
    expect(cmp.vm.visible).toBeFalsy();
  });

  it('watch message change', () => {
    cmp.vm.clearLastMessage = jest.fn();
    $store.getters.message = { title: 'abc', content: 'bye', type: 'success' };
    expect(cmp.vm.visible).toBeTruthy();
    expect(cmp.vm.clearLastMessage).toHaveBeenCalled();
  });
});
