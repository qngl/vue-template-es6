/* eslint-env jest */
// Import Vue and the component being tested

import { shallowMount, createLocalVue } from '@vue/test-utils';
import textDivider from '../index.vue';

const localVue = createLocalVue();
const stubs = ['v-layout', 'v-divider'];
const $vuetify = {
  theme: {}
};

describe('@/components/textDivider should ', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(textDivider, {
      localVue,
      stubs,
      mocks: {
        $vuetify
      },
      propsData: {
        text: '217 cars found'
      }
    });
    jest.spyOn(cmp.vm, '$emit');
  });

  it('be initialized', () => {
    expect(cmp.find('.text-divider').exists()).toBeTruthy();
    expect(cmp.find('div').text()).toBe('217 cars found');
  });
});
