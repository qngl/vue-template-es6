import Cookies from 'js-cookie';

const Auth = 'Auth';
const Refresh = 'RFS';
const LastLoginTimestamp = 'LLT';
const TOKEN_LIVE_TIME = 1000 * 60 * 15;

export function isLoginUser() {
  const lastAuthTime = Number(getLastAuthTime() ? getLastAuthTime() : 0);
  return Date.now() - lastAuthTime < TOKEN_LIVE_TIME;
}

export function getToken() {
  return Cookies.get(Auth);
}

export function getRefreshToken() {
  return Cookies.get(Refresh);
}

export function getLastAuthTime() {
  return Cookies.get(LastLoginTimestamp);
}

export function setToken(token, refreshToken, timestamp) {
  Cookies.set(Auth, token);
  Cookies.set(Refresh, refreshToken);
  Cookies.set(LastLoginTimestamp, timestamp);
}

export function removeToken() {
  Cookies.remove(Auth);
  Cookies.remove(Refresh);
  Cookies.remove(LastLoginTimestamp);
}

export function getUserInfo() {
  const token = getToken();
  if (token) {
    let userInfo = token.split('\\.')[1];
    userInfo = atob(userInfo);
    return userInfo;
  }
}
