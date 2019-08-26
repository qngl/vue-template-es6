import _ from 'lodash';

// set function parseTime to filter
export { parseTime } from '@/utils';

export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}

export function num(num) {
  return toThousandFilter(_.round(num, 2));
}

export function yuan(num) {
  return toThousandFilter(_.round(num, 2));
}

export function wan(num) {
  return toThousandFilter(_.round((+num || 0) / 10000.0, 2));
}

export function percentage(num) {
  return toThousandFilter(_.round((+num || 0) * 100, 2));
}

export function date(date) {
  return this.$t('product.dateString', [date.getFullYear(), date.getMonth() + 1, date.getDate()]);
}

export function mask(text, start = 0, length = 0) {
  const replacement = '*********************';
  if (!text || text.length < start + length) {
    return text;
  }

  return text.substr(0, start) + replacement.substr(0, length) + text.substr(start + length);
}

export function omit(text, position) {
  if (!text) {
    return text;
  }

  if (_.isNumber(position) && text.length > position) {
    return text.substr(0, position);
  }
  if (_.isString(position)) {
    const index = text.indexOf(position);
    if (index > 0) {
      return text.substr(0, index);
    }
  }
}
