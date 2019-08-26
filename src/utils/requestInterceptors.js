import Agent from 'agentkeepalive';

import store from '@/store';
import { getToken } from '@/utils/auth';

export const keepaliveAgent = new Agent({
  maxSockets: 100,
  maxFreeSockets: 10,
  timeout: 60000, // active socket keepalive for 60 seconds
  freeSocketTimeout: 30000 // free socket keepalive for 30 seconds
});

export function requestSuccessInterceptor(config) {
  if (store.getters.token) {
    config.headers['Auth'] = getToken();
  }
  return config;
}

export function requestErrorInterceptor(error) {
  return Promise.reject(error);
}

export function responseSuccessInterceptor(response) {
  if (response.config.url.indexOf('refreshToken') < 0) {
    store.dispatch('refreshLastActiveTime');
  }
  return response;
}

export function responseErrorInterceptor(error) {
  const response = error.response;
  if (response && response.status === 401 && response.data && response.data.errorCode === 401103) {
    // Token expired
    store.dispatch('showError', 'message.loginSessionExpired');
    store.dispatch('logout').then(() => {
      location.reload();
    });
  }

  if (!response || !response.status || response.status < 0 || response.status >= 500) {
    store.dispatch('showError', 'message.networkConnectionLost');
  } else {
    return Promise.reject(response);
  }
}
