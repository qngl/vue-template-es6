/* eslint-env jest */

import dateFormat from '../formatTime';

describe('filters/formatTime.js', () => {
  it('should formar date well', () => {
    let date = new Date('January 1, 2019 03:24:00');
    expect(dateFormat.formatDate(date, 'yyyy.MM.dd')).toBe('2019.01.01');
  });
});
