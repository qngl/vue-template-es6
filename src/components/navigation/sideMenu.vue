<template>
  <v-layout align-center justify-space-between column fill-height>
    <v-layout align-start justify-center row class="logo-in-menu" @click="gotoHomePageWithClear">
      <img :src="logo" alt="logo" />
    </v-layout>
    <v-spacer />
    <v-layout align-space-between justify-end column fill-height style="width: 100%;">
      <v-list class="vw-side-menu-list">
        <side-menu-item route="homepage" icon="fas fa-home" />
        <side-menu-item route="chooseModelByMake" icon="fas fa-car" />
        <side-menu-item route="chooseModelByBudget" svg-icon="money" />
        <side-menu-item route="dealerList" icon="fas fa-building" />
        <side-menu-item route="luckyDraw" icon="fas fa-bullhorn" />
        <side-menu-item route="userProfile" icon="fas fa-user-circle" />
        <side-menu-item route="aboutUs" icon="fas fa-address-card" />
      </v-list>
      <div class="bottom-box">
        <v-btn v-if="!isLoginUser" outline round class="login-btn" @click="register">
          {{ $t('action.register') }}
        </v-btn>
        <v-btn v-if="!isLoginUser" outline round class="login-btn" @click="login">
          {{ $t('action.login') }}
        </v-btn>
        <logout-confirm-dialog v-if="isLoginUser" />
      </div>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';

import { isLoginUser } from '@/utils/auth';
import sideMenuItem from './sideMenuItem';
import logoutConfirmDialog from './logoutConfirmDialog';
import logo from '@/assets/logo.svg';

const MAX_IDLE_TIME = 1000 * 60 * 60;
const REFRESH_PERIOD = 1000 * 60 * 10;

export default {
  name: 'SideMenu',
  components: {
    sideMenuItem,
    logoutConfirmDialog
  },
  data() {
    return {
      logo: logo,
      logoutDialog: false,
      isLoginUser: false
    };
  },
  computed: {
    ...mapGetters(['lastAuthTime', 'lastActiveTime'])
  },
  watch: {
    lastAuthTime() {
      this.isLoginUser = isLoginUser();
      if (this.isLoginUser) {
        this.scheduleRefreshTokenTask();
      }
    },
    lastActiveTime() {
      this.isLoginUser = isLoginUser();
    }
  },
  created() {
    this.isLoginUser = isLoginUser();
    if (this.isLoginUser) {
      this.$store.dispatch('refreshToken');
    }
  },
  methods: {
    toggleSideMenu() {
      this.$emit('toggle');
    },
    gotoHomePageWithClear() {
      this.$store.dispatch('clearMakeFilter');
      this.$router.push({ name: 'homepage' });
    },
    login() {
      this.$store.dispatch('saveRedirect', { name: this.$route.name, params: this.$route.params, query: this.$route.query });
      this.$router.push({ name: 'login', query: { redirect: true } });
    },
    register() {
      this.$store.dispatch('saveRedirect', { name: this.$route.name, params: this.$route.params, query: this.$route.query });
      this.$router.push({ name: 'registration', query: { redirect: true } });
    },
    isIdleTimeout() {
      const lastActiveTime = this.lastActiveTime ? this.lastActiveTime : 0;
      return Date.now() - lastActiveTime > MAX_IDLE_TIME;
    },
    scheduleRefreshTokenTask() {
      if (this.isIdleTimeout()) {
        this.$store.dispatch('logout').then(() => {
          this.$router.push({ name: 'homepage' });
        });
      } else {
        setTimeout(() => {
          this.$store.dispatch('refreshToken');
        }, REFRESH_PERIOD);
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';

.v-navigation-drawer {
  .logo-in-menu {
    width: 100%;
    padding: 2rem;

    img {
      width: 100%;
    }
  }

  .bottom-box {
    padding: 1.75rem;
    text-align: center;
  }

  .vw-side-menu-list.v-list {
    padding: 0 0.75rem;
    width: 100%;
    color: $white;

    & > div {
      border-bottom: 1px solid $border-gray--dark;
      height: calc((100vh - 13rem) / 7);
    }

    & > div:first-child {
      border-top: 1px solid $border-gray--dark;
    }

    .v-list__tile--link {
      height: 100%;
      padding-left: calc((100% - 8.5rem) / 2);
      font-size: 0.9375rem;
      font-weight: 500;

      .v-icon {
        font-size: 1.125rem;
      }

      .svg-icon {
        width: 1.25rem;
        height: 1.25rem;
      }
    }

    .v-list__tile__action {
      justify-content: center;
    }

    .primary--text {
      color: $accent !important;
    }
  }

  .v-btn {
    font-size: 1rem;
  }
}
</style>
