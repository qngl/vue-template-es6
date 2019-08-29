/* eslint-env jest */
// Import Vue and the component being tested

import { shallowMount, createLocalVue } from '@vue/test-utils';
import bottomSheetSelect from '../index.vue';

const localVue = createLocalVue();
const propsData1 = {
  options: [{ label: '1', value: 'A' }, { label: '2-未知', value: 'B' }],
  formatLabel: true
};
const propsData2 = {
  options: [{ label: '1', value: 'A' }, { label: '2', value: 'B' }, { label: '3-未知', value: 'C' }],
  initial: ['B'],
  unique: true
};
const propsData3 = {
  options: [{ label: '1', value: 'A' }, { label: '2-未知', value: 'B' }],
  initial: ['B'],
  required: false
};
const mocks = {
  $t: jest.fn()
};
const stubs = ['v-layout', 'v-bottom-sheet', 'v-flex', 'v-text-field', 'v-subheader', 'v-list', 'v-list-tile', 'v-list-tile-title'];

describe('@/components/bottomSheetSelect should', () => {
  let cmp;

  it('be initialized with formatLabel', () => {
    cmp = shallowMount(bottomSheetSelect, {
      localVue,
      mocks,
      propsData: propsData1,
      stubs
    });
    expect(cmp.vm).toBeDefined();
    expect(cmp.vm.options[0]['$formatedLabel']).toBeDefined();
  });

  it('be initialized with initial', () => {
    cmp = shallowMount(bottomSheetSelect, {
      localVue,
      mocks,
      propsData: propsData2,
      stubs
    });
    expect(cmp.vm).toBeDefined();
    expect(cmp.vm.selected.length).toBe(1);
    expect(cmp.vm.selected[0].value).toEqual('B');
  });

  it('handleClick on item', () => {
    cmp = shallowMount(bottomSheetSelect, {
      localVue,
      mocks,
      propsData: propsData1,
      stubs
    });
    cmp.vm.handleClick(cmp.vm.options[0]);
    expect(cmp.vm.selected).toBeDefined();
    expect(cmp.vm.selected.length).toBe(1);
  });

  it('handleClick on item with unique option', () => {
    cmp = shallowMount(bottomSheetSelect, {
      localVue,
      mocks,
      propsData: propsData2,
      stubs
    });
    cmp.vm.handleClick(cmp.vm.options[2]);
    expect(cmp.vm.selected).toBeDefined();
    expect(cmp.vm.selected.length).toBe(1);
    expect(cmp.vm.selected[0].value).toEqual('C');
  });

  it('handleClick on item with required false', () => {
    cmp = shallowMount(bottomSheetSelect, {
      localVue,
      mocks,
      propsData: propsData3,
      stubs
    });
    expect(cmp.vm.selected).toBeDefined();
    expect(cmp.vm.selected.length).toBe(1);
    expect(cmp.vm.selected[0].value).toEqual('B');
    cmp.vm.handleClick(cmp.vm.options[1]);
    expect(cmp.vm.selected.length).toBe(0);
  });

  it('watch options changes', () => {
    const propsData = {
      options: [{ label: '1', value: 'A' }, { label: '2-未知', value: 'B' }],
      formatLabel: true
    };
    cmp = shallowMount(bottomSheetSelect, {
      localVue,
      mocks,
      propsData,
      stubs
    });
    cmp.setProps(propsData2);
    expect(cmp.vm.options.length).toBe(3);
    expect(cmp.vm.options[2]['$formatedLabel']).toBeDefined();
  });
});
