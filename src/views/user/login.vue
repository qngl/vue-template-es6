<template>
  <div class="main-container login-box">
    <v-layout align-center row justify-center fill-height transition="slide-y-reverse-transition">
      <login-form @success="handleSuccess" />
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import loginForm from './components/loginForm';

export default {
  name: 'Login',
  components: {
    loginForm
  },
  computed: {
    ...mapGetters(['redirect'])
  },
  methods: {
    handleSuccess() {
      if (this.$route.query.redirect && this.redirect) {
        this.$router.replace(this.redirect);
        this.$store.dispatch('removeRedirect');
      } else {
        this.$router.replace({ name: 'homepage' });
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';

.main-container.login-box {
  width: 100%;
  height: 20rem;
  min-height: calc(100vh - 8.5rem);

  .v-card {
    width: 100%;
  }

  .loading-box {
    .spinner {
      color: $white;
    }
  }
}
</style>
