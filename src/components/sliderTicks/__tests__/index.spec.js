/* eslint-env jest */
// Import Vue and the component being tested

import { shallowMount, createLocalVue } from '@vue/test-utils';
import sliderTicks from '../index.vue';

const localVue = createLocalVue();
const stubs = [];
const $t = jest.fn().mockReturnValue('m');
const $num = jest.fn();

describe('@/components/sliderTicks should ', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(sliderTicks, {
      localVue,
      stubs,
      mocks: {
        $t,
        $num
      },
      propsData: {
        max: 520000,
        min: 10000
      }
    });
  });

  it('be initialized and return ticks', () => {
    expect(cmp.vm.ticks.length).toBe(6);
    expect(cmp.vm.ticks[0].value).toBe(10000);
    expect(cmp.vm.ticks[5].value).toBe(500000);
    expect(cmp.vm.labelSuffix).toBe('m');
  });

  it('able to customize step and suffix etc.', () => {
    cmp.setProps({ max: 89 });
    cmp.setProps({ min: 30 });
    cmp.setProps({ step: 10 });
    cmp.setProps({ suffix: '%' });

    expect(cmp.vm.ticks.length).toBe(6);
    expect(cmp.vm.ticks[0].value).toBe(30);
    expect(cmp.vm.ticks[5].value).toBe(80);
    expect(cmp.vm.labelSuffix).toBe('%');
  });

  it('change slider value after clicking on a tick ', () => {
    jest.spyOn(cmp.vm, '$emit');
    var item = {
      value: 500000
    };
    cmp.vm.setSliderValue(item);

    expect(cmp.vm.$emit).toHaveBeenCalledWith('change', 500000);
  });
});
