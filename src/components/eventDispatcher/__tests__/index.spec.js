/* eslint-env jest */
// Import Vue and the component being tested

import { shallowMount, createLocalVue } from '@vue/test-utils';
import eventDispatcher from '../index.vue';

const localVue = createLocalVue();

describe('@/components/eventDispatcher/index should', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(eventDispatcher, {
      localVue
    });
  });

  it('be initialized and trigger event input', () => {
    expect(cmp.vm.event).toBeNull();

    const eventDispatcher = cmp.find('#event-dispatcher');
    eventDispatcher.element.value = 'deviceready###';
    eventDispatcher.trigger('input');
    expect(cmp.vm.event).toBe('deviceready###');
  });
});
