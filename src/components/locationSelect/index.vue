<template>
  <v-bottom-sheet v-model="visible" full-width>
    <v-text-field
      v-if="!activator"
      slot="activator"
      :value="label"
      :placeholder="$t('input.pleaseSelectLocation')"
      :clearable="clearable"
      :hide-details="hideDetails"
      :append-icon="label ? '' : 'fas fa-map-marker-alt'"
      :rules="$attrs.rules"
      readonly
      single-line
      outline
      @click:clear="clearSelection"
    />
    <v-layout row wrap class="location-select-bottom-sheet">
      <loading :progress="loading" center />
      <v-flex v-if="title" xs12>
        <v-subheader class="location-select-bottom-sheet--title">
          {{ title }}
        </v-subheader>
        <v-btn
          v-if="showConfirmButton"
          v-show="confirmButtonVisible"
          absolute
          top
          right
          round
          outline
          small
          color="primary"
          @click="onUpdate"
        >
          {{ $t('action.confirmed') }}
        </v-btn>
      </v-flex>
      <v-flex xs6>
        <v-subheader>
          {{ $t('input.pleaseSelectProvince') }}
        </v-subheader>
      </v-flex>
      <v-flex xs6>
        <v-subheader>
          {{ $t('input.pleaseSelectCity') }}
        </v-subheader>
      </v-flex>
      <v-flex ref="provincesBox" xs6 class="scroll-box">
        <v-list>
          <v-list-tile
            v-for="opt in provinceOptions"
            :id="`province-${opt.provinceId}`"
            :key="opt.provinceId"
            :class="{ active: province && opt.provinceId === province.provinceId }"
            @click="updateProvince(opt)"
          >
            <v-list-tile-title>{{ opt.provinceNameCN }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex ref="citiesBox" xs6 class="scroll-box">
        <loading :progress="loadingCities" center />
        <v-list v-if="cities && cities.length > 0">
          <v-list-tile
            v-for="opt in cities"
            :key="opt.cityId"
            :class="{ active: city && opt.cityId === city.cityId }"
            @click="updateCity(opt)"
          >
            <v-list-tile-title>{{ opt.cityNameCN }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-bottom-sheet>
</template>

<script>
import { listProvinces, oneProvince } from '@/api/region';

import loading from '@/components/loading';

export default {
  name: 'LocationSelect',
  components: {
    loading
  },
  props: {
    provinceId: {
      type: Number,
      default: 0
    },
    cityId: {
      type: Number,
      default: 0
    },
    activator: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    cityRequired: {
      type: Boolean,
      default: false
    },
    showConfirmButton: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: 0,
      loadingCities: 0,
      visible: false,
      province: null,
      city: null,
      provinceOptions: null,
      cities: []
    };
  },
  computed: {
    label() {
      let val = '';
      if (this.province && this.city) {
        val = this.province.provinceNameCN;
        if (this.cities.length > 1) {
          val += ' ' + this.city.cityNameCN;
        }
      }
      return val;
    },
    confirmButtonVisible() {
      return !!this.label;
    }
  },
  watch: {
    activator() {
      this.visible = !this.visible;
    },
    visible() {
      if (this.visible) {
        if (this.provinceId) {
          const idx = this.provinceOptions.findIndex(item => item.provinceId === this.provinceId);
          this.$nextTick(() => {
            this.$refs.provincesBox.scrollTop = idx * 48 - 192;
          });
        }
        if (this.cityId && this.cities) {
          const idx = this.cities.findIndex(item => item.cityId === this.cityId);
          this.$nextTick(() => {
            this.$refs.citiesBox.scrollTop = idx * 48 - 240;
          });
        }
      }
    },
    provinceId() {
      this.refresh();
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.loading++;
      listProvinces().then(response => {
        this.provinceOptions = response.data;
        this.refresh();
        this.loading--;
      });
    },
    refresh() {
      if (this.provinceId) {
        this.province = this.provinceOptions.find(item => item.provinceId === this.provinceId);
        this.loading++;
        this.getCities(this.provinceId).then(response => {
          const province = response.data;
          if (province) {
            this.cities = province.cities;
            if (this.cityRequired && !this.cityId) {
              this.city = this.cities[0];
              this.onUpdate();
            }
            if (this.cityId) {
              this.city = this.cities.find(item => item.cityId === this.cityId);
            }
          }
          this.loading--;
        });
      }
    },
    getCities(provinceId) {
      if (typeof provinceId === 'number') {
        return oneProvince(provinceId);
      }
      return Promise.resolve();
    },
    updateProvince(province) {
      this.province = province;
      if (this.province) {
        this.loadingCities++;
        this.getCities(this.province.provinceId).then(response => {
          const province = response.data;
          if (province) {
            this.cities = province.cities;
            if (this.cityRequired) {
              this.city = this.cities[0];
            } else {
              this.city = undefined;
            }
            this.onUpdate();
          }
          this.loadingCities--;
        });
      } else {
        this.cities = [];
        this.city = undefined;
        this.onUpdate();
      }
    },
    updateCity(city) {
      this.city = city;
      this.onUpdate();
      this.visible = false;
    },
    clearSelection() {
      this.province = undefined;
      this.city = undefined;
      this.onUpdate();
    },
    onUpdate() {
      const data = {
        provinceId: this.province ? this.province.provinceId : void 0,
        cityId: this.city ? this.city.cityId : void 0,
        provinceName: this.province ? this.province.provinceNameCN : void 0,
        cityName: this.city ? this.city.cityNameCN : void 0
      };
      this.$emit('change', data);
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.location-select-bottom-sheet {
  height: calc(100vh - 15rem);
  overflow: auto;
  background-color: $white;

  &--title {
    font-size: 1rem;
    font-weight: 900;
  }

  .v-btn--top.v-btn--absolute.v-btn--small {
    top: 0.5rem;
  }

  & > .scroll-box {
    height: calc(100% - 3rem);
    overflow: auto;

    .v-list {
      .v-list__tile__title {
        font-size: 0.875rem;
      }

      & > div.active {
        background-color: $bg-gray-highlight;
      }
    }
  }
}
</style>
