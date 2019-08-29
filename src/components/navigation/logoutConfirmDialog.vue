<template>
  <v-dialog v-model="dialog">
    <v-btn slot="activator" flat class="logut-btn">
      {{ $t('action.logout') }}
    </v-btn>
    <v-card class="confirm-card">
      <v-card-title>
        {{ $t('login.confirmLogout') }}
      </v-card-title>
      <v-divider />
      <v-card-actions>
        <v-btn block round color="secondary" @click="cancel">
          {{ $t('action.cancel') }}
        </v-btn>
        <v-btn block round color="primary" @click="logout">
          {{ $t('action.confirmed') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'LogoutConfirmDialog',
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    cancel() {
      this.dialog = false;
      this.$store.dispatch('toggleSideBar');
    },
    logout() {
      this.dialog = false;
      this.$store.dispatch('toggleSideBar');
      this.$store.dispatch('logout').then(() => {
        location.href = '';
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.v-navigation-drawer .logut-btn.v-btn {
  font-size: 0.875rem;
  font-weight: 100;
  opacity: 0.6;
}
</style>
