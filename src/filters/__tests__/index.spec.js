/* eslint-env jest */

import { yuan, wan, num, percentage, mask, omit, parseTime } from '../index';

describe('filters/index.js', () => {
  beforeAll(() => {});
  beforeEach(() => {});

  it('should format a number as number', () => {
    expect(num(123456)).toBe('123,456');
    expect(num(1234.56)).toBe('1,234.56');
  });

  it('should format a number as money yuan', () => {
    expect(yuan(123456)).toBe('123,456');
    expect(yuan(1234.56)).toBe('1,234.56');
  });

  it('should format a number as money wan', () => {
    expect(wan(123456)).toBe('12.35');
    expect(wan(1234.56)).toBe('0.12');
  });

  it('should format a number as percentage', () => {
    expect(percentage(0.1234)).toBe('12.34');
    expect(percentage(0)).toBe('0');
    expect(percentage(1)).toBe('100');
  });

  it('should show a string with mask', () => {
    expect(mask('11011329991212742X', 10, 4)).toBe('1101132999****742X');
    expect(mask('13811331777', 3, 4)).toBe('138****1777');
    expect(mask(null, 3, 4)).toBe(null);
  });

  it('should show omit a string', () => {
    expect(omit('2018-09-09 12:12', ' ')).toBe('2018-09-09');
    expect(omit('2018-09-09 12:12', 10)).toBe('2018-09-09');
    expect(omit(null, 10)).toBe(null);
  });

  it('should parse time to a formatted string', () => {
    expect(parseTime(new Date(1540358343209), '{y}-{m}-{d} {h}:{i}')).toBe('2018-10-24 13:19');
    expect(parseTime(new Date(1540358343209), '{y}-{m}-{d}')).toBe('2018-10-24');
  });
});
