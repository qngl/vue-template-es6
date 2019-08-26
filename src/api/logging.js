import request from '@/utils/request';

export function saveError(payload = {}) {
  const PREFIX = 'FE-LOG: ';
  const LEVEL = {
    DEBUG: 4,
    INFO: 4,
    WARN: 2,
    ERROR: 1
  };
  payload.UUID = window.UUID;
  payload.monitor = 'V';
  payload.url = window.location.href;
  const navigator = window.navigator || {};
  payload.browser = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    vendor: navigator.vendor,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    connection: navigator.connection
  };
  const data = {
    message: PREFIX + JSON.stringify(payload),
    eventLogType: LEVEL.ERROR
  };

  try {
    return request({
      url: '/log/logRecord',
      method: 'post',
      data
    });
  } catch (error) {
    // ignore error cased by logging
  }
}
