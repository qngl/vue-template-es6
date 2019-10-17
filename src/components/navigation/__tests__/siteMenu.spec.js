/* eslint-env jest */
// Import Vue and the component being tested

import { isLoginUser } from '@/utils/auth';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import sideMenu from '../sideMenu.vue';

jest.useFakeTimers();

jest.mock('@/utils/auth', () => {
  return {
    isLoginUser: jest.fn(() => true)
  };
});
jest.mock('../sideMenuItem', () => jest.fn());
jest.mock('../logoutConfirmDialog', () => jest.fn());
jest.mock('@/assets/logo.svg', () => jest.fn());

const localVue = createLocalVue();
const $store = {
  getters: {
    lastAuthTime: 1,
    lastActiveTime: 1
  },
  dispatch: jest.fn(() => Promise.resolve())
};
const $route = {
  name: 'test',
  params: {},
  query: {}
};
const $router = {
  push: jest.fn()
};
const $t = jest.fn();
const stubs = ['v-layout', 'v-spacer', 'v-list', 'side-menu-item', 'v-btn', 'logout-confirm-dialog'];

const MAX_IDLE_TIME = 1000 * 60 * 60;

describe('@/components/navigation/sideMenu should', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(sideMenu, {
      localVue,
      mocks: {
        $store,
        $route,
        $router,
        $t
      },
      stubs
    });
  });

  it('be initialized', () => {
    expect(cmp.find('.logo-in-menu').exists()).toBeTruthy();
    expect(cmp.find('.vw-side-menu-list').exists()).toBeTruthy();
    expect(cmp.find('.bottom-box').exists()).toBeTruthy();
    expect(cmp.vm.logo).toBeDefined();
    expect(cmp.vm.logoutDialog).toBeDefined();
    expect(cmp.vm.isLoginUser).toBeDefined();
    expect(cmp.vm.lastActiveTime).toBeDefined();
    expect(cmp.vm.toggleSideMenu).toBeDefined();
    expect(isLoginUser).toHaveBeenCalled();
    expect($store.dispatch).toHaveBeenCalledWith('refreshToken');
  });

  it('emit toggleSideMenu event', () => {
    cmp.vm.toggleSideMenu();
    expect(cmp.emitted().toggle[0]).toEqual([]);
  });

  it('scheduleRefreshTokenTask when lastAuthTime change', () => {
    cmp.vm.scheduleRefreshTokenTask = jest.fn();
    $store.getters.lastAuthTime = 2;
    expect(cmp.vm.scheduleRefreshTokenTask).toHaveBeenCalled();
  });

  it('set isLoginUser when lastActiveTime change', () => {
    cmp.vm.isLoginUser = false;
    $store.getters.lastActiveTime = 2;
    expect(cmp.vm.isLoginUser).toBeTruthy();
  });

  it('saveRedirect and login', () => {
    cmp.vm.login();
    expect(cmp.vm.$store.dispatch).toHaveBeenCalledWith('saveRedirect', { name: $route.name, params: $route.params, query: $route.query });
    expect(cmp.vm.$router.push).toHaveBeenCalledWith({ name: 'login', query: { redirect: true } });
  });

  it('saveRedirect and register', () => {
    cmp.vm.register();
    expect(cmp.vm.$store.dispatch).toHaveBeenCalledWith('saveRedirect', { name: $route.name, params: $route.params, query: $route.query });
    expect(cmp.vm.$router.push).toHaveBeenCalledWith({ name: 'registration', query: { redirect: true } });
  });

  it('check isIdleTimeout', () => {
    $store.getters.lastActiveTime = Date.now() - MAX_IDLE_TIME - 10000;
    expect(cmp.vm.isIdleTimeout()).toBeTruthy();
    $store.getters.lastActiveTime = Date.now();
    expect(cmp.vm.isIdleTimeout()).toBeFalsy();
  });
});
