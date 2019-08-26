import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';
import vuetifyZhLocale from 'vuetify/lib/locale/zh-Hans';
import zhLocale from './zh';

Vue.use(VueI18n);

const messages = {
  'zh-CN': {
    $vuetify: vuetifyZhLocale,
    ...zhLocale
  }
};

const i18n = new VueI18n({
  // set locale
  // options: en or zh
  locale: Cookies.get('lng') || 'zh-CN',
  // set locale messages
  messages
});

export default i18n;
