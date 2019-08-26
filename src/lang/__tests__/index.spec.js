/* eslint-env jest */

import i18n from '../index';
import VueI18n from 'vue-i18n';
jest.mock('vuetify/lib/locale/zh-Hans', () => jest.fn());

describe('lang/index.js', () => {
  beforeEach(() => {});

  it('should define i18n module', () => {
    let messages = i18n.messages;

    expect(i18n.locale).toBe('zh-CN');
    expect(i18n).toBeInstanceOf(VueI18n);
    expect(messages.hasOwnProperty('zh-CN')).toBeTruthy();
    expect(Object.entries(messages['zh-CN']).length).toBeGreaterThan(1);
  });
});
