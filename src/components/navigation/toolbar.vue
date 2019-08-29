<template>
  <v-toolbar dark fixed app class="top-toolbar justify-center" :class="pageClass">
    <back-button v-if="!isHomepage" />
    <v-spacer />
    <v-toolbar-title v-if="isHomepage">
      <div class="logo">
        <cdn-image :src="logos.qnglapp" />
      </div>
    </v-toolbar-title>
    <v-toolbar-title v-if="!isHomepage">
      <template v-if="showBrandLogo">
        <div class="brand-logo">
          <cdn-image :src="brandLogo" />
        </div>
      </template>
      <template v-else>
        {{ pageTitle }}
      </template>
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-side-icon @click="toggleSideMenu" />
  </v-toolbar>
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';
import logo from '@/assets/images/logo.svg';
import logoBentley from '@/assets/images/logo-bentley.png';
import backButton from './backButton';
import cdnImage from '@/components/sizedImage/cdnImage';

export default {
  name: 'Toolbar',
  components: {
    backButton,
    cdnImage
  },
  data() {
    return {
      logos: {
        bentley: logoBentley,
        qnglapp: logo
      }
    };
  },
  computed: {
    ...mapGetters(['theme']),
    routeName() {
      return this.$route.name;
    },
    pageClass() {
      return _.kebabCase(this.routeName);
    },
    isHomepage() {
      return this.routeName === 'homepage';
    },
    pageTitle() {
      return this.$t('route.' + (this.$route.name || this.$route.meta.title));
    },
    showBrandLogo() {
      return this.routeName === 'brands' && this.brandLogo;
    },
    brandLogo() {
      return this.logos[this.theme];
    }
  },
  methods: {
    toggleSideMenu() {
      this.$store.dispatch('toggleSideBar');
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';

.top-toolbar {
  &.v-toolbar {
    box-shadow: none;
    background-color: $primary;

    &__content {
      justify-content: center;
      flex-direction: row;
    }
  }

  .logo {
    width: calc(100vw - 8rem);
    padding-left: 1.5rem;
    padding-top: 0.5rem;

    & > img {
      max-height: 2.5rem;
    }
  }

  .brand-logo {
    width: 7rem;
    padding-top: 2rem;

    & > img {
      width: 100%;
    }
  }
}
</style>
