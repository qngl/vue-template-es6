<template>
  <div class="theme-switcher" />
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';
import * as themes from '@/theme';

const BRAND_PAGES = ['brands', 'chooseVariant', 'chooseProduct', 'quotationCalculation', 'showQrCode', 'dealerList', 'dealerDetails'];
const LOGIN_PAGES = ['login', 'registration', 'resetPassword'];

export default {
  name: 'ThemeSwitcher',
  data() {
    return {
      savedTheme: null
    };
  },
  computed: {
    ...mapGetters(['theme']),
    routeName() {
      return this.$route.name;
    }
  },
  watch: {
    theme() {
      this.changeTheme(this.theme);
    },
    routeName() {
      if (BRAND_PAGES.indexOf(this.routeName) < 0) {
        if (this.theme) {
          if (LOGIN_PAGES.indexOf(this.routeName) >= 0) {
            this.savedTheme = this.theme;
          }
          this.$store.dispatch('clearTheme');
        }
      } else {
        if (this.savedTheme) {
          this.$store.dispatch('setTheme', this.savedTheme);
          this.savedTheme = null;
        }
      }
    }
  },
  created() {
    if (this.$route.query.theme) {
      const theme = this.$route.query.theme;
      if (themes[theme]) {
        this.$store.dispatch('setTheme', theme);
      }
    }
  },
  methods: {
    changeTheme(theme) {
      const newTheme = _.assign({}, themes['defaultTheme'], themes[theme]);
      this.$vuetify.theme = newTheme;
      document.getElementsByTagName('html')[0].style.backgroundColor = this.$vuetify.theme.background;
      document.getElementsByTagName('body')[0].style.backgroundColor = this.$vuetify.theme.background;
    }
  }
};
</script>
