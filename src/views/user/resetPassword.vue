<template>
  <div class="main-container reset-password-box">
    <v-layout
      align-center
      row
      justify-center
      fill-height
    >
      <reset-password-form
        @success="handleSuccess"
      />
    </v-layout>
  </div>
</template>

<script>
import resetPasswordForm from './components/resetPasswordForm';

export default {
  name: 'ResetPassword',
  components: {
    resetPasswordForm
  },
  methods: {
    handleSuccess() {
      this.$router.replace({ name: 'login', query: this.$route.query });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';

.main-container.reset-password-box {
  width: 100%;
  min-height: calc(100vh - 8.5rem);
  padding-top: 1rem;

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
