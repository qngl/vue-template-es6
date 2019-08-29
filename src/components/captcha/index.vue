<template>
  <v-dialog v-model="visible" content-class="focus-dialog" full-width>
    <v-card>
      <v-card-text class="text-xs-center">
        <h3 v-font-color="$vuetify.theme.primary">
          {{ $t('model.captcha') }}
        </h3>
      </v-card-text>
      <v-card-text class="code-image text-xs-center">
        <v-btn slot="append" color="white" flat @click="getImageCode">
          <loading :show="loading" center />
          <v-img v-if="!!codeImage" :src="codeImage" />
          <v-icon v-if="!!codeImage" color="primary" class="pl-2">
            fas fa-sync-alt
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text class="captcha-card-input text-xs-center">
        <v-text-field
          ref="captchaInput"
          v-model="value"
          :placeholder="$t('input.pleaseEnterCaptcha')"
          :color="$vuetify.theme.primary"
          mask="####"
          single-line
          outline
          pattern="[0-9]*"
          type="tel"
          class="captcha-input"
          @input="enterCaptcha"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import loading from '@/components/loading';
import refresh from '@/assets/images/refresh.svg';
import { getImageCode } from '@/api/sms';

export default {
  name: 'Captcha',
  components: {
    loading
  },
  props: {
    show: {
      type: Number,
      default: 0
    },
    hide: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      loading: true,
      visible: false,
      value: null,
      codeImage: null,
      refresh: refresh,
      securityId: null
    };
  },
  watch: {
    show() {
      this.visible = true;
      this.value = null;
      this.getImageCode().then(() => {
        this.$nextTick(() => {
          this.$refs.captchaInput.focus();
        });
      });
    },
    hide() {
      this.visible = false;
      this.value = null;
    }
  },
  methods: {
    getImageCode() {
      this.loading = true;
      return getImageCode().then(response => {
        this.codeImage = 'data:image/png;base64,' + response.data.imageContent;
        this.securityId = response.data.securityId;
        this.loading = false;
      });
    },
    enterCaptcha() {
      if (this.value && this.value.length === 4) {
        this.$emit('input-code', { securityId: this.securityId, securityCode: this.value });
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';

.focus-dialog {
  margin-top: 5rem;
  align-self: flex-start;
}

.v-text-field.captcha-input {
  &.v-text-field {
    padding-top: 0;
    margin-top: 0.375rem;

    input {
      margin-top: 0.375rem;
    }
  }

  .v-input__append-inner {
    margin-top: 0.375rem;
    margin-right: -0.75rem;
  }
}

.v-dialog__content {
  .v-text-field--outline {
    .v-input__slot {
      min-height: 3rem;
      border-radius: 3rem;
      height: 3rem;
      padding: 0 1.375rem;
    }
  }
}

.v-card__text.code-image {
  width: 72%;
  margin: 0 auto;
  padding: 5px;
  background-color: $bg-overlay--dark;

  .v-btn {
    margin: 0;
    width: 11rem;

    .v-image {
      margin: 0 2.5rem 0 0;
    }

    .v-icon {
      color: $primary;
    }
  }
}

.v-card__text.captcha-card-input {
  width: 80%;
  margin: 0 auto;
}
</style>
