/* eslint-env jest */
// Import Vue and the component being tested

import { shallowMount, createLocalVue } from '@vue/test-utils';
import sizedImage from '../index.vue';

jest.mock('@/assets/images/default-vehicle.svg', () => 'data:image/jpg;base64');
jest.mock('@/assets/images/default-blank.svg', () => 'data:image/png;base64');

const localVue = createLocalVue();
const stubs = ['v-img', 'v-layout'];
window.ENV = {
  CDN_DOMAIN: ''
};

describe('@/components/sizedImage/index should', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(sizedImage, {
      localVue,
      stubs,
      propsData: {
        src: '/static/img/logo-svw.7f77d0e.png',
        vehicle: false,
        aspectRatio: 1.9
      }
    });
  });

  it('be initialized', () => {
    expect(cmp.vm.url).toContain('logo-svw.7f77d0e.png');
  });
  it('use placeholder if src does not exist', () => {
    cmp.setProps({ src: null });
    expect(cmp.vm.placeholder).toContain('data:image/png;base64');
  });
  it('use vehicle placeholder', () => {
    cmp.setProps({ vehicle: true });
    expect(cmp.vm.placeholder).toContain('data:image/jpg;base64');
  });
});
