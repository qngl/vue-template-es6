/* eslint-env jest */
// Import Vue and the component being tested
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import login from '../login.vue';
import loginForm from '../components/loginForm';

jest.mock('../components/loginForm', () => {
  return jest.fn();
});

const $router = {
  replace: jest.fn()
};
const $route = {
  query: {}
};
const $routeWithRedirect = {
  query: {
    redirect: true
  }
};
const localVue = createLocalVue();
localVue.use(Vuex);
const $storeWithRedirect = {
  getters: {
    redirect: {
      name: 'homepage'
    }
  },
  dispatch: jest.fn()
};
const $store = {
  getters: {
    redirect: null
  },
  dispatch: jest.fn()
};
const stubs = ['v-layout', 'login-form'];

describe('login.vue should', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(login, {
      localVue,
      mocks: {
        $store,
        $router,
        $route
      },
      stubs
    });
  });

  it('be initialized correctly', () => {
    expect(cmp.vm).toBeDefined();
    expect(login).toBeDefined();
    expect(loginForm).toBeDefined();
  });

  it('handleSuccess with redirect', () => {
    cmp = shallowMount(login, {
      localVue,
      mocks: {
        $store: $storeWithRedirect,
        $router,
        $route: $routeWithRedirect
      },
      stubs
    });

    cmp.vm.handleSuccess();
    expect($router.replace).toHaveBeenCalledWith({
      name: 'homepage'
    });
    expect($storeWithRedirect.dispatch).toHaveBeenCalledWith('removeRedirect');
  });

  it('handleSuccess without redirect', () => {
    cmp.vm.handleSuccess();
    expect($router.replace).toHaveBeenCalledWith({ name: 'homepage' });
  });
});
