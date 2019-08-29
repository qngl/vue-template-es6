/* eslint-env jest */
// Import Vue and the component being tested
import { shallowMount, createLocalVue } from '@vue/test-utils';
import labelText from '../index.vue';

const localVue = createLocalVue();
const stubs = ['slot'];
const $vuetify = {
  theme: {}
};

describe('@/components/labelText should', () => {
  let cmp;

  it('be initialized', () => {
    cmp = shallowMount(labelText, {
      localVue,
      mocks: {
        $vuetify
      },
      propsData: {
        label: 'abc'
      },
      stubs
    });
    expect(cmp.find('.label-text').exists()).toBeTruthy();
    expect(cmp.find('.label-text--label').exists()).toBeTruthy();
    expect(cmp.find('.label-text--text').exists()).toBeTruthy();
  });
});
