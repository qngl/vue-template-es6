/* eslint-env jest */
// Import Vue and the component being tested

import { shallowMount, createLocalVue } from '@vue/test-utils';
import tenorSelect from '../index.vue';

const localVue = createLocalVue();
const stubs = ['button-select'];
const $t = jest.fn().mockReturnValue('month');

describe('@/components/tenorSelect should ', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(tenorSelect, {
      localVue,
      stubs,
      mocks: {
        $t
      },
      propsData: {
        initial: [12, 24, 36, 60]
      }
    });
    jest.spyOn(cmp.vm, '$emit');
  });

  it('be initialized', () => {
    expect(cmp.vm.tenors.length).toBe(7);
    expect(cmp.vm.tenors[0].label).toBe('12month');
    expect(cmp.vm.tenors[6].label).toBe('60month');

    const selected = {
      value: 12,
      label: '12month'
    };
    cmp.vm.toggle(selected);
    expect(cmp.vm.$emit).toHaveBeenCalledWith('change', selected);
  });
});
