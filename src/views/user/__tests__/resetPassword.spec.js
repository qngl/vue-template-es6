/* eslint-env jest */
// Import Vue and the component being tested
import { shallowMount, createLocalVue } from '@vue/test-utils';
import resetPassword from '../resetPassword.vue';
import resetPasswordForm from '../components/resetPasswordForm';

jest.mock('../components/resetPasswordForm', () => {
  return jest.fn();
});

const localVue = createLocalVue();
const $router = {
  replace: jest.fn()
};
const $route = {
  query: {}
};
const stubs = ['v-layout', 'reset-password-form'];

describe('resetPassword.vue should', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(resetPassword, {
      localVue,
      mocks: {
        $router,
        $route
      },
      stubs
    });
  });

  afterEach(() => {
    cmp.destroy();
  });

  it('be initialized correctly', () => {
    expect(cmp.vm).toBeDefined();
    expect(resetPasswordForm).toBeDefined();
  });

  it('handleSuccess', () => {
    cmp.vm.handleSuccess();
    expect($router.replace).toHaveBeenCalledWith({ name: 'login', query: {} });
  });
});
