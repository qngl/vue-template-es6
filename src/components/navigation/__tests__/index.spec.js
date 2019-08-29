/* eslint-env jest */
// Import Vue and the component being tested

import { shallowMount, createLocalVue } from '@vue/test-utils';
import navigation from '../index.vue';

jest.mock('../sideMenu', () => jest.fn());

const localVue = createLocalVue();
const $store = {
  getters: {
    sidebar: {
      opened: false
    }
  },
  dispatch: jest.fn()
};
const $t = jest.fn();
const stubs = ['v-navigation-drawer', 'side-menu'];
const $vuetify = {
  theme: {}
};

describe('@/components/navigation should', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(navigation, {
      localVue,
      mocks: {
        $store,
        $t,
        $vuetify
      },
      stubs
    });
  });

  it('be initialized', () => {
    expect(cmp.html()).toContain('<v-navigation-drawer');
    expect(cmp.html()).toContain('<side-menu');
    expect(cmp.vm.drawer).toBeDefined();
  });

  it('toggleSideMenu when emitted from side-menu', () => {
    cmp.vm.toggleSideMenu();
    expect($store.dispatch).toHaveBeenCalledWith('toggleSideBar');
  });

  it('toggleSideMenu when state change', () => {
    cmp.vm.toggleSideMenu = jest.fn();
    cmp.vm.drawer = true;
    expect(cmp.vm.toggleSideMenu).toHaveBeenCalled();
  });
});
