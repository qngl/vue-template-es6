import request from '@/utils/request';
import requestSSO from '@/utils/requestSSO';

export function signIn(data) {
  return requestSSO({
    url: '/token',
    method: 'post',
    data
  });
}

export function refreshToken(data) {
  return requestSSO({
    url: '/refreshToken',
    method: 'post',
    data
  });
}

export function register(data) {
  return request({
    url: '/customer/registration',
    method: 'post',
    data
  });
}

export function getAccount() {
  return request({
    url: '/customer/me',
    method: 'get'
  });
}

export function updateAccount(data) {
  return request({
    url: '/customer/me',
    method: 'put',
    data
  });
}

export function updatePassword(data) {
  return request({
    url: '/customer/updatePassword',
    method: 'put',
    data
  });
}
