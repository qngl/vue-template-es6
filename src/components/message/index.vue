<template>
  <v-snackbar v-model="visible" :timeout="10000000" top color="white" class="notification-box">
    <v-alert v-if="!!message" :value="true" :icon="icons[message.type]" :color="message.type" outline>
      <div v-if="message.title" class="notification-box--title">
        {{ $t(message.title) }}
      </div>
      <div v-if="message.content" class="notification-box--content">
        {{ $t(message.content) }}
      </div>
    </v-alert>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Message',
  data() {
    return {
      visible: false,
      icons: {
        success: 'fas fa-check-circle',
        error: 'fas fa-info-circle',
        info: 'fas fa-info-circle'
      },
      lastClearTask: null
    };
  },
  computed: {
    ...mapGetters(['message'])
  },
  watch: {
    message: {
      handler() {
        if (this.message && this.message.type) {
          this.visible = true;
          this.clearLastMessage();
        } else {
          this.visible = false;
        }
      },
      deep: true
    }
  },
  methods: {
    clearLastMessage() {
      if (this.lastClearTask) {
        clearTimeout(this.lastClearTask);
        this.scheduleTimeout();
      } else {
        this.scheduleTimeout();
      }
    },
    scheduleTimeout() {
      const timeout = this.message.type === 'success' ? 3000 : 5000;
      this.lastClearTask = setTimeout(() => {
        this.$store.dispatch('clearMessage');
        this.lastClearTask = null;
      }, timeout);
    }
  },
  notifications: {
    showSuccessMsg: {
      type: 'success'
    },
    showInfoMsg: {
      type: 'info'
    },
    showErrorMsg: {
      type: 'error'
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';

.notification-box {
  .v-snack__content {
    padding: 0;
    height: auto;

    .v-alert {
      border: none !important;
    }
  }

  &--title {
    font-weight: 900;
  }
}
</style>
