/* eslint-env jest */
// Import Vue and the component being tested

import { listProvinces, oneProvince } from '@/api/region';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import locationSelect from '../index.vue';

jest.mock('@/components/loading', () => {
  return jest.fn();
});
jest.mock('@/api/region', () => {
  return {
    listProvinces: jest.fn(() => Promise.resolve({ data: [{ provinceId: 1, provinceNameCN: '吉林' }] })),
    oneProvince: jest.fn(() =>
      Promise.resolve({
        data: {
          provinceId: 1,
          cities: [{ cityId: 1, provinceId: 1, cityNameCN: '吉林' }, { cityId: 2, provinceId: 1, cityNameCN: '长春' }]
        }
      })
    )
  };
});

const localVue = createLocalVue();
const propsData1 = {
  provinceId: 1,
  cityId: 1
};
const mocks = {
  $t: jest.fn()
};
const stubs = [
  'loading',
  'v-layout',
  'v-bottom-sheet',
  'v-flex',
  'v-text-field',
  'v-subheader',
  'v-list',
  'v-list-tile',
  'v-list-tile-title'
];

describe('@/components/locationSelect', () => {
  let cmp;

  describe('without props should', () => {
    beforeEach(() => {
      cmp = shallowMount(locationSelect, {
        localVue,
        mocks,
        stubs
      });
    });

    it('be initialized with empty', () => {
      expect(cmp.vm).toBeDefined();
      expect(cmp.vm.provinceOptions).toBeDefined();
      expect(listProvinces).toHaveBeenCalled();
      expect(oneProvince).not.toHaveBeenCalled();
    });

    it('updateProvince to item', () => {
      cmp.vm.updateProvince(cmp.vm.provinceOptions[0]);
      expect(cmp.vm.province).toBeDefined();
      expect(oneProvince).toHaveBeenCalled();
    });
  });

  describe('with props should', () => {
    beforeEach(() => {
      cmp = shallowMount(locationSelect, {
        localVue,
        mocks,
        propsData: propsData1,
        stubs
      });
    });

    it('be initialized with data', () => {
      expect(cmp.vm).toBeDefined();
      expect(cmp.vm.province).toBeDefined();
      expect(cmp.vm.city).toBeDefined();
      expect(cmp.vm.cities).toBeDefined();
    });

    it('updateProvince to item', () => {
      cmp.vm.updateProvince(cmp.vm.provinceOptions[0]);
      expect(cmp.vm.province).toBeDefined();
      expect(oneProvince).toHaveBeenCalled();
    });

    it('updateProvince to empty', () => {
      cmp.vm.updateProvince();
      expect(cmp.vm.city).toBeUndefined();
      expect(oneProvince).toHaveBeenCalled();
      expect(cmp.emitted().change[0]).toEqual([{ provinceId: void 0, cityId: void 0 }]);
    });

    it('updateCity to item', () => {
      cmp.vm.updateCity(cmp.vm.cities[1]);
      expect(cmp.vm.city).toBeDefined();
      expect(cmp.vm.city.cityId).toEqual(2);
      expect(cmp.emitted().change[0]).toEqual([{ provinceId: 1, cityId: 2, provinceName: '吉林', cityName: '长春' }]);
    });

    it('clearSelection', () => {
      cmp.vm.clearSelection();
      expect(cmp.vm.province).toBeUndefined();
      expect(cmp.vm.city).toBeUndefined();
      expect(cmp.emitted().change[0]).toEqual([{ provinceId: void 0, cityId: void 0 }]);
    });

    it('return promise in getCities', () => {
      expect(cmp.vm.getCities(1)).toBeDefined();
      expect(cmp.vm.getCities()).toBeDefined();
    });
  });

  describe('with props cityRequired should', () => {
    beforeEach(() => {
      cmp = shallowMount(locationSelect, {
        localVue,
        propsData: {
          provinceId: 1,
          cityRequired: true
        },
        mocks,
        stubs
      });
    });

    it('be initialized with default city', () => {
      expect(cmp.vm).toBeDefined();
      expect(cmp.vm.provinceOptions).toBeDefined();
      expect(cmp.vm.province).toBeDefined();
      expect(cmp.vm.city).toBeDefined();
    });
  });

  describe('with props cityRequired should', () => {
    beforeEach(() => {
      cmp = shallowMount(locationSelect, {
        localVue,
        propsData: {
          cityRequired: true
        },
        mocks,
        stubs
      });
    });

    it('updateProvince to item with default city', () => {
      cmp.vm.updateProvince(cmp.vm.provinceOptions[0]);
      expect(cmp.vm.province).toBeDefined();
      expect(cmp.vm.city).toBeDefined();
    });
  });
});
