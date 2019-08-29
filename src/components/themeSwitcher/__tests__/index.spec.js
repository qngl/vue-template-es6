/* eslint-env jest */
// Import Vue and the component being tested
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import themeSwitcher from '../index.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.directive('ripple', jest.fn());
const $route = {
  query: {}
};
const $vuetify = {};
const mocks = {
  $t: jest.fn(),
  $route,
  $vuetify
};
const stubs = ['v-layout', 'v-flex'];
const store = new Vuex.Store({
  getters: {
    theme: () => null
  }
});

describe('@/components/themeSwitcher should', () => {
  let cmp;

  beforeAll(() => {
    global.ENV = {
      ENABLE_BENTLEY: true
    };
  });

  it('be initialized without selected', () => {
    cmp = shallowMount(themeSwitcher, {
      store,
      localVue,
      mocks,
      stubs
    });
    expect(cmp.vm).toBeDefined();
  });
});
