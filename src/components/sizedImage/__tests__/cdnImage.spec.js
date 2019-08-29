/* eslint-env jest */
// Import Vue and the component being tested

import { shallowMount, createLocalVue } from '@vue/test-utils';
import cdnImage from '../cdnImage.vue';

jest.mock('@/assets/images/default-blank.svg', () => 'data:image/png;base64');

const localVue = createLocalVue();
const stubs = [];

describe('@/components/sizedImage/cdnImage should', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(cdnImage, {
      localVue,
      stubs,
      propsData: {
        src: '/static/img/logo-svw.7f77d0e.png'
      }
    });
  });

  it('be initialized', () => {
    expect(cmp.vm.url).toContain('logo-svw.7f77d0e.png');
  });
  it('call placeholder image if without src', () => {
    cmp.setProps({ src: null });
    expect(cmp.vm.url).toContain('data:image/png;base64');
  });
});
