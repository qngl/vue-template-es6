<template>
  <v-dialog v-model="visible" content-class="focus-dialog" full-width>
    <div class="row">
      <div ref="vaptcha" class="vw-vaptcha">
        <div class="vaptcha-init-main">
          <div class="vaptcha-init-loading">
            <a href="https: //www.vaptcha.com/" target="_blank">
              <img src="https://cdn.vaptcha.com/vaptcha-loading.gif" />
            </a>
            <span class="vaptcha-text">
              VAPTCHA启动中...
            </span>
          </div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
const vaptcha = 'https://cdn.vaptcha.com/v2.js';
const vid = 'TOBEREPLACED';
const extend = function(to, _from) {
  for (const key in _from) {
    to[key] = _from[key];
  }
  return to;
};

export default {
  props: {
    type: {
      type: String,
      default: 'embed'
    },
    scene: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#3C8AFF'
    },
    lang: {
      type: String,
      default: 'zh-CN'
    },
    show: {
      type: Number,
      default: 0
    },
    hide: {
      type: Number,
      default: 0
    },
    mobile: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      script: null,
      vaptchaObj: null,
      visible: false
    };
  },
  watch: {
    show() {
      this.visible = true;
    },
    hide() {
      this.vaptchaObj.reset();
      this.visible = false;
    }
  },
  mounted() {
    const config = extend(
      {
        vid: vid,
        container: this.$refs.vaptcha
      },
      this.$props
    );
    this.loadV2Script().then(() => {
      window.vaptcha(config).then(obj => {
        obj.listen('pass', () => {
          const data = {
            phoneNo: this.$props.mobile,
            vaptchaToken: obj.getToken()
          };
          this.$emit('input', data);
        });
        this.vaptchaObj = obj;
        obj.render();
      });
    });
  },
  methods: {
    loadV2Script() {
      if (typeof window.vaptcha === 'function') {
        return Promise.resolve();
      } else {
        return new Promise(resolve => {
          const script = document.createElement('script');
          script.src = vaptcha;
          script.async = true;
          script.onload = script.onreadystatechange = function() {
            if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
              resolve();
              script.onload = script.onreadystatechange = null;
            }
          };
          document.getElementsByTagName('head')[0].appendChild(script);
        });
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';

.focus-dialog {
  margin-top: 9rem;
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

.container {
  padding: 0;
}

.vw-vaptcha {
  height: 18.75rem;
}

.vaptcha-text {
  color: $white;
}

.vaptcha-init-loading {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
</style>
