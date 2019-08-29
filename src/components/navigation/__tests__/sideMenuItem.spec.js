/* eslint-env jest */
// Import Vue and the component being tested

import { shallowMount, createLocalVue } from '@vue/test-utils';
import sideMenuItem from '../sideMenuItem.vue';

const localVue = createLocalVue();
const $route = jest.fn();
const $t = jest.fn().mockReturnValue('page title');
const stubs = ['v-list-tile', 'v-list-tile-action', 'v-icon', 'svg-icon', 'v-list-tile-content', 'v-list-tile-title'];

describe('@/components/navigation/sideMenuItem should', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(sideMenuItem, {
      localVue,
      mocks: {
        $route,
        $t
      },
      propsData: {
        route: 'dealerList',
        icon: 'fas fa-building'
      },
      stubs
    });
  });

  it('be initialized and properly render computation props', () => {
    expect(cmp.vm.currentRoute).toBeDefined();
    expect(cmp.vm.pageTitle).toEqual('page title');
    expect(cmp.vm.to.name).toEqual('dealerList');
  });
});
