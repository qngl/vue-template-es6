import axios from 'axios';

import {
  keepaliveAgent,
  requestSuccessInterceptor,
  requestErrorInterceptor,
  responseSuccessInterceptor,
  responseErrorInterceptor
} from './requestInterceptors';

const apiBase = window.ENV && window.ENV.API_GATEWAY && window.ENV.API_GATEWAY.SSO;
// create an axios instance
const service = axios.create({
  baseURL: apiBase, // api 的 base_url
  timeout: 300000, // request timeout
  httpAgent: keepaliveAgent,
  httpsAgent: keepaliveAgent
});

// request interceptor
service.interceptors.request.use(requestSuccessInterceptor, requestErrorInterceptor);

// response interceptor
service.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);

export default service;
