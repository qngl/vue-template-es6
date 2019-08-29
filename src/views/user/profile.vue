<template>
  <div class="main-container user-profile">
    <v-layout align-center justify-space-between row class="user-info-box">
      <div class="avatar">
        <v-img :src="avatar" contain />
      </div>
      <div v-if="userData">
        <div>
          {{ userData.name }}
        </div>
        <div>
          {{ userData.mobileNumber }}
        </div>
      </div>
      <v-spacer />
      <v-btn color="white" small outline round @click="completeUserData()">
        {{ $t('action.completeUserData') }}
      </v-btn>
    </v-layout>
    <v-layout row wrap class="pt-5">
      <v-flex xs12>
        <v-list>
          <v-list-tile avatar ripple @click="mySavedQuotations">
            <v-list-tile-content>
              <v-list-tile-title>
                <i aria-hidden="true" class="fas fa-coins mx-2" />
                {{ $t('action.mySavedQuotations') }}
              </v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>fas fa-chevron-right</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile avatar ripple @click="myLuckyDraws">
            <v-list-tile-content>
              <v-list-tile-title>
                <i aria-hidden="true" class="fas fa-gift mx-2" />
                {{ $t('route.myLuckyDraws') }}
              </v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>fas fa-chevron-right</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import avatar from '@/assets/images/logo.svg';
import { getAccount } from '@/api/user';

export default {
  name: 'UserProfile',
  data() {
    return {
      avatar: avatar,
      userData: null,
      loading: 0
    };
  },
  created() {
    this.getUserData();
    this.$store.dispatch('toggleBodyBackground', true);
  },
  beforeDestroy() {
    this.$store.dispatch('toggleBodyBackground', false);
  },
  methods: {
    getUserData() {
      this.loading++;
      getAccount().then(response => {
        this.userData = response.data;
        this.loading--;
      });
    },
    completeUserData() {
      this.$router.push({ name: 'completeUserData' });
    },
    mySavedQuotations() {
      this.$router.push({ name: 'savedQuotations' });
    },
    myLuckyDraws() {
      this.$router.push({ name: 'myLuckyDraws' });
    },
    myFavorites() {
      this.$router.push({ name: 'myFavorites' });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';

.main-container.user-profile {
  width: 100%;
  margin-top: 3.4rem;

  .theme--light.v-list {
    padding: 0;
    background-color: transparent;
    color: $primary;

    & > div {
      margin-top: 0.75rem;
      background-color: $white;

      .v-list__tile {
        height: 3.75rem;
      }
    }

    .theme--light.v-icon {
      color: $primary;
    }
  }

  .user-info-box {
    color: $white;

    .avatar {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 4rem;
      height: 4rem;
      margin: 0 1rem;
      padding: 0.125rem;
      border: 1px solid $black;
      border-radius: 50%;
      background-color: $primary;
      background-image: linear-gradient(to top right, $primary, $info);
    }
  }
}
</style>
