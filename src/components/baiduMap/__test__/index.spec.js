/* eslint-env jest */
// Import Vue and the component being tested
jest.mock('../service.js', () => {
  return {
    load: jest.fn().mockResolvedValue('map'),
    show: jest.fn().mockResolvedValueOnce('show')
  };
});

import { shallowMount, createLocalVue } from '@vue/test-utils';
import baiduMap from '../index.vue';
import { load, show } from '../service.js';

jest.useFakeTimers();

const localVue = createLocalVue();
const stubs = ['loading'];

describe('@/components/baiduMap/index should ', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(baiduMap, {
      localVue,
      mocks: {},
      stubs,
      propsData: {
        mapOptions: {
          centerAndZoom: 'dealer 1'
        }
      }
    });
  });

  it('be initialized', () => {
    expect(cmp.find('.baidu-map-box').exists()).toBeTruthy();
    expect(cmp.vm.isLoading).toBeFalsy();
  });
  it('correctly load baidu map', () => {
    expect(cmp.vm.mapLoaded).toBeTruthy();
    expect(cmp.vm.timeout).toBeFalsy();
    expect(load).toHaveBeenCalled();
    expect(show).toHaveBeenCalled();
  });
  it('hide map if timeout', () => {
    cmp.vm.mapLoaded = false;
    jest.runAllTimers();
    expect(cmp.vm.mapLoaded).toBeTruthy();
    expect(cmp.vm.timeout).toBeTruthy();
    expect(cmp.vm.isLoading).toBeFalsy();
    expect(cmp.find('.baidu-map-instance').exists()).toBeFalsy();
  });
});
