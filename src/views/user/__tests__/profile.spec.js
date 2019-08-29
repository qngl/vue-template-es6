/* eslint-env jest */
// Import Vue and the component being tested
import { shallowMount, createLocalVue } from '@vue/test-utils';
import avatar from '@/assets/images/logo.svg';
import profile from '../profile.vue';
import { getAccount } from '@/api/user';

jest.mock('@/api/user', () => {
  return {
    getAccount: jest.fn(() => Promise.resolve({ data: [{ id: 1 }] }))
  };
});
jest.mock('@/assets/images/logo.svg', () => jest.fn());

const localVue = createLocalVue();
const $router = {
  push: jest.fn()
};
const $store = {
  dispatch: jest.fn(() => Promise.resolve())
};
const $t = jest.fn();
const stubs = [
  'v-layout',
  'v-img',
  'v-spacer',
  'v-btn',
  'v-flex',
  'v-list',
  'v-list-tile',
  'v-list-tile-content',
  'v-list-tile-title',
  'v-list-tile-action',
  'v-icon'
];

describe('profile.vue should', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(profile, {
      localVue,
      mocks: {
        $store,
        $router,
        $t
      },
      stubs
    });
  });

  it('be initialized correctly', () => {
    expect(cmp.vm).toBeDefined();
    expect(cmp.vm.userData).toEqual([{ id: 1 }]);
    expect(cmp.vm.loading).toBeDefined();
    expect(avatar).toBeDefined();
    expect(getAccount).toHaveBeenCalled();
  });

  it('go to completeUserData', () => {
    cmp.vm.completeUserData();
    expect($router.push).toBeCalledWith({ name: 'completeUserData' });
  });

  it('go to mySavedQuotations', () => {
    cmp.vm.mySavedQuotations();
    expect($router.push).toBeCalledWith({ name: 'savedQuotations' });
  });

  it('go to myLuckyDraws', () => {
    cmp.vm.myLuckyDraws();
    expect($router.push).toBeCalledWith({ name: 'myLuckyDraws' });
  });

  it('go to myFavorites', () => {
    cmp.vm.myFavorites();
    expect($router.push).toBeCalledWith({ name: 'myFavorites' });
  });
});
