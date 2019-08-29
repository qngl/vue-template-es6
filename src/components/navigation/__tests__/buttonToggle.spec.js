/* eslint-env jest */
// Import Vue and the component being tested

import { shallowMount, createLocalVue } from '@vue/test-utils';
import buttonToggle from '../buttonToggle.vue';

const localVue = createLocalVue();
const $store = {
  dispatch: jest.fn()
};
const $vuetify = {
  breakpoint: {
    smAndDown: true
  }
};
const stubs = ['v-btn', 'v-icon'];

describe('@/components/navigation/buttonToggle should', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(buttonToggle, {
      localVue,
      mocks: {
        $store,
        $vuetify
      },
      stubs
    });
  });

  it('be initialized and toggle side menu', () => {
    expect(cmp.find('.side-menu-toggle-btn').exists()).toBeTruthy();
    cmp.vm.toggleSideMenu();
    expect(cmp.vm.$store.dispatch).toHaveBeenCalledWith('toggleSideBar');
  });
});
