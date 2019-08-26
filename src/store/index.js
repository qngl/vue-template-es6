import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import errorLog from './modules/errorLog';
import message from './modules/message';
import user from './modules/user';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    message,
    user,
    errorLog
  },
  getters
});
