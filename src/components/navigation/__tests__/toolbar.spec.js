/* eslint-env jest */
// Import Vue and the component being tested

import { shallowMount, createLocalVue } from '@vue/test-utils';
import toolbar from '../toolbar.vue';

jest.mock('@/assets/images/logo.svg', () => 'data:image');

const localVue = createLocalVue();
const $route = { name: 'dealerList' };
const $store = {
  dispatch: jest.fn()
};
const $t = jest.fn().mockReturnValue('page title');
const stubs = ['v-toolbar', 'back-button', 'v-spacer', 'v-toolbar-title', 'cdn-image', 'v-toolbar-side-icon', 'cdn-image'];

describe('@/components/navigation/toolbar should', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(toolbar, {
      localVue,
      mocks: {
        $route,
        $store,
        $t
      },
      stubs
    });
  });

  it('be initialized and properly render computation props', () => {
    expect(cmp.vm.logos).toBeDefined();
    expect(cmp.vm.pageTitle).toEqual('page title');
    expect(cmp.vm.isHomepage).toBeFalsy();
  });
  it('be able to toggle side menu', () => {
    cmp.vm.toggleSideMenu();
    expect(cmp.vm.$store.dispatch).toHaveBeenCalledWith('toggleSideBar');
  });
  it('display different UI for homepage', () => {
    cmp.vm.$route.name = 'homepage';
    expect(cmp.vm.isHomepage).toBeTruthy();
  });
});
