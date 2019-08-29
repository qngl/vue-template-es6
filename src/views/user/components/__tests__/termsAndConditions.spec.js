/* eslint-env jest */
// Import Vue and the component being tested
import { shallowMount, createLocalVue } from '@vue/test-utils';
import termsAndConditions from '../termsAndConditions.vue';
import { getTermsTacs } from '@/api/setting';
import dateFormat from '../../../../filters/formatTime';

jest.mock('@/components/loading', () => {
  return jest.fn();
});
jest.mock('@/api/setting', () => {
  return {
    getTermsTacs: jest.fn(() =>
      Promise.resolve({
        id: 1,
        data: { id: 1, content: '111isiisisi', contentHtml: 'sssss', title: '服务条款', updateDate: '2018-10-18T18:41:41.097+08:00' }
      })
    )
  };
});

const localVue = createLocalVue();
localVue.directive('loading', jest.fn());
const $t = jest.fn();
const stubs = ['v-layout', 'v-card', 'v-toolbar', 'v-flex', 'v-card-text', 'loading', 'v-dialog'];

describe('termsAndConditions.vue should', () => {
  let cmp;
  beforeEach(() => {
    cmp = shallowMount(termsAndConditions, {
      localVue,
      mocks: {
        $t
      },
      stubs
    });
  });

  it('be initialized correctly', () => {
    expect(cmp.vm).toBeDefined();
    expect(cmp.vm.tac).toBeDefined();
    expect(cmp.vm.dialog).toBeFalsy();
    expect(cmp.vm.loading).toEqual(0);
    expect(dateFormat).toBeDefined();
  });

  it('get Terms Tacs', () => {
    cmp.vm.goTermsAndConditions();
    expect(getTermsTacs).toHaveBeenCalled();
  });
});
