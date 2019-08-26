import { signIn, refreshToken } from '@/api/user';
import { getToken, setToken, removeToken, getRefreshToken, getLastAuthTime } from '@/utils/auth';
import { saveTemp, getTemp, removeTemp, clearTemp } from '../state';

const user = {
  state: {
    lastAuthTime: getLastAuthTime(),
    lastActiveTime: Date.now(),
    token: getToken(),
    refreshToken: getRefreshToken(),
    redirect: getTemp('RDT')
  },

  mutations: {
    SET_TOKEN: (state, token, refreshToken) => {
      state.token = token;
      state.refreshToken = refreshToken;
    },
    SET_LASTAUTHTIME: (state, lastAuthTime) => {
      state.lastAuthTime = lastAuthTime;
    },
    SET_LASTACTIVETIME: (state, lastActiveTime) => {
      state.lastActiveTime = lastActiveTime;
    },
    SET_REDIRECT: (state, redirect) => {
      state.redirect = redirect;
    }
  },

  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        userInfo.scope = 2; // sso customer scope
        signIn(userInfo)
          .then(response => {
            const data = response.data;
            const lastAuthTime = Date.now();
            commit('SET_TOKEN', data.token, data.refreshToken);
            commit('SET_LASTAUTHTIME', lastAuthTime);
            setToken(data.token, data.refreshToken, lastAuthTime);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    refreshToken({ commit }) {
      return new Promise((resolve, reject) => {
        refreshToken({ refreshToken: getRefreshToken() })
          .then(response => {
            const data = response.data;
            const lastAuthTime = Date.now();
            commit('SET_TOKEN', data.token, data.refreshToken);
            commit('SET_LASTAUTHTIME', lastAuthTime);
            setToken(data.token, data.refreshToken, lastAuthTime);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    refreshLastActiveTime({ commit }) {
      commit('SET_LASTACTIVETIME', Date.now());
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '', '');
        commit('SET_LASTAUTHTIME', 0);
        removeToken();
        clearTemp();
        resolve();
      });
    },
    saveRedirect({ commit }, redirectTo) {
      const blackList = ['login', 'registration', 'resetPassword'];
      if (blackList.indexOf(redirectTo.name) < 0) {
        commit('SET_REDIRECT', redirectTo);
        saveTemp('RDT', redirectTo);
      }
    },
    removeRedirect({ commit }) {
      commit('SET_REDIRECT', null);
      removeTemp('RDT');
    }
  }
};

export default user;
