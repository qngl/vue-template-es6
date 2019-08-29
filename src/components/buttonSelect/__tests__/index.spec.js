/* eslint-env jest */
// Import Vue and the component being tested
import { shallowMount, createLocalVue } from '@vue/test-utils';
import buttonSelect from '../index.vue';

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

describe('@/components/buttonSelect should', () => {
  let cmp;

  it('be initialized with formatLabel', () => {
    cmp = shallowMount(buttonSelect, {
      localVue,
      propsData: propsData1,
      stubs: ['v-layout', 'v-btn']
    });
    expect(cmp.vm).toBeDefined();
    expect(cmp.vm.options[0]['$formatedLabel']).toBeDefined();
  });

  it('be initialized with initial', () => {
    cmp = shallowMount(buttonSelect, {
      localVue,
      propsData: propsData2,
      stubs: ['v-layout', 'v-btn']
    });
    expect(cmp.vm).toBeDefined();
    expect(cmp.vm.selected.length).toBe(1);
    expect(cmp.vm.selected[0]).toEqual('B');
  });

  it('handleClick on item', () => {
    cmp = shallowMount(buttonSelect, {
      localVue,
      propsData: propsData1,
      stubs: ['v-layout', 'v-btn']
    });
    cmp.vm.handleClick(cmp.vm.options[0]);
    expect(cmp.vm.selected).toBeDefined();
    expect(cmp.vm.selected.length).toBe(1);
  });

  it('handleClick on item with unique option', () => {
    cmp = shallowMount(buttonSelect, {
      localVue,
      propsData: propsData2,
      stubs: ['v-layout', 'v-btn']
    });
    cmp.vm.handleClick(cmp.vm.options[2]);
    expect(cmp.vm.selected).toBeDefined();
    expect(cmp.vm.selected.length).toBe(1);
    expect(cmp.vm.selected[0]).toEqual('C');
  });

  it('handleClick on item with required false', () => {
    cmp = shallowMount(buttonSelect, {
      localVue,
      propsData: propsData3,
      stubs: ['v-layout', 'v-btn']
    });
    expect(cmp.vm.selected).toBeDefined();
    expect(cmp.vm.selected.length).toBe(1);
    expect(cmp.vm.selected[0]).toEqual('B');
    cmp.vm.handleClick(cmp.vm.options[1]);
    expect(cmp.vm.selected.length).toBe(0);
  });

  it('watch options changes', () => {
    const propsData = {
      options: [{ label: '1', value: 'A' }, { label: '2-未知', value: 'B' }],
      formatLabel: true
    };
    cmp = shallowMount(buttonSelect, {
      localVue,
      propsData,
      stubs: ['v-layout', 'v-btn']
    });
    cmp.setProps(propsData2);
    expect(cmp.vm.options.length).toBe(3);
    expect(cmp.vm.options[2]['$formatedLabel']).toBeDefined();
  });
});
