<template>
  <button-select :options="tenors" :initial="initial || [tenors[tenors.length - 1].value]" @change="toggle" />
</template>

<script>
import buttonSelect from '@/components/buttonSelect';

export default {
  name: 'TenorSelect',
  components: {
    buttonSelect
  },
  props: {
    initial: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      tenors: [{ value: 12 }, { value: 18 }, { value: 24 }, { value: 30 }, { value: 36 }, { value: 48 }, { value: 60 }]
    };
  },
  created() {
    this.tenors.forEach(item => {
      item.label = item.value + this.$t('product.month');
    });
  },
  methods: {
    toggle(selected) {
      this.$emit('change', selected);
    }
  }
};
</script>
