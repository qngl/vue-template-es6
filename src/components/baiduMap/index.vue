<template>
  <div class="baidu-map-box">
    <div v-if="!timeout" class="baidu-map-instance" />
    <loading :progress="isLoading" />
  </div>
</template>

<script>
import loading from '@/components/loading';
import { load, show } from './service.js';

export default {
  components: {
    loading
  },
  props: {
    mapOptions: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      map: null,
      mapLoaded: false,
      timeout: null
    };
  },
  computed: {
    isLoading() {
      return this.mapLoaded ? 0 : 1;
    }
  },
  mounted() {
    setTimeout(() => {
      this.hideIfTimeout();
    }, 30000);
    load()
      .then(() => {
        return show(this.$el.childNodes[0], this.mapOptions);
      })
      .then(map => {
        if (this.loaded) {
          this.loaded();
        }
        this.map = map;
        this.mapLoaded = true;
        this.timeout = false;
        this.$emit('loaded', map);
      });
  },
  methods: {
    hideIfTimeout() {
      if (!this.mapLoaded) {
        this.mapLoaded = true;
        this.timeout = true;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';

.baidu-map-box {
  background-color: $white;
}

.baidu-map-instance {
  height: 100%;
}
</style>
