/* eslint-env jest */
// Import Vue and the component being tested

import { shallowMount, createLocalVue } from '@vue/test-utils';
import logoutConfirmDialog from '../logoutConfirmDialog.vue';

const localVue = createLocalVue();
const $store = {
  dispatch: jest
    .fn()
    .mockReturnValueOnce('first call')
    .mockResolvedValueOnce('second call')
};
const $t = jest.fn();
const stubs = ['v-dialog', 'v-btn', 'v-card', 'v-card-title', 'v-divider', 'v-card-actions', 'v-btn'];

describe('@/components/navigation/logoutConfirmDialog should', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(logoutConfirmDialog, {
      localVue,
      mocks: {
        $store,
        $t
      },
      stubs
    });
  });

  it('be initialized', () => {
    expect(cmp.find('.logut-btn').exists()).toBeTruthy();
    expect(cmp.find('.confirm-card').exists()).toBeTruthy();
  });
  it('open logout confirm box and logout', () => {
    cmp.vm.dialog = true;
    cmp.vm.logout();
    expect(cmp.vm.dialog).toBeFalsy();
    expect(cmp.vm.$store.dispatch).toHaveBeenCalledWith('toggleSideBar');
    expect(cmp.vm.$store.dispatch).toHaveBeenCalledWith('logout');
    expect(location.href).toEqual('http://localhost/');
  });
  it('open logout confirm box and cancel', () => {
    cmp.vm.dialog = true;
    cmp.vm.cancel();
    expect(cmp.vm.dialog).toBeFalsy();
    expect(cmp.vm.$store.dispatch).toHaveBeenCalledWith('toggleSideBar');
  });
});
