import _ from 'lodash';

export function isRequired(value) {
  return !!value;
}
export function maxlength(value, length) {
  return length >= ('' + value).length;
}

export function isUrl(textval) {
  const PATTERN = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return PATTERN.test(textval);
}

export function isMobileNumber(str) {
  const PATTERN = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
  return PATTERN.test(str);
}

export function isEmail(email) {
  const PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return PATTERN.test(email);
}

export function isPassword(val) {
  const PATTERN = /^((?=.*\d)|(?=.*[@#$%^&+=.!();*_|\\±§<>,/`˜-]))(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
  return PATTERN.test(val);
}

export function isNumber(value, max = Number.MAX_VALUE, min = Number.MIN_VALUE) {
  const num = _.toNumber(value);
  return num >= min && num <= max;
}

export function isChineseIdCardNumber(string) {
  return rid18(string);

  function rid18(ID) {
    var results = { valid: true };

    ID = '' + ID;
    if (!/^\d{17}(\d|X)$/.test(ID)) {
      results.valid = false;
      return results;
    }

    // validate province code
    var provinces = {
      11: 'Beijing',
      12: 'Tianjin',
      13: 'Hebei',
      14: 'Shanxi',
      15: 'Neimenggu',
      21: 'Liaoning',
      22: 'Jilin',
      23: 'Heilongjiang',
      31: 'Shanghai',
      32: 'Jiangsu',
      33: 'Zhejiang',
      34: 'Anhui',
      35: 'Fujian',
      36: 'Jiangxi',
      37: 'Shandong',
      41: 'Henan',
      42: 'Hubei',
      43: 'Hunan',
      44: 'Guangdong',
      45: 'Guangxi',
      46: 'Hainan',
      50: 'Chongqing',
      51: 'Sichuan',
      52: 'Guizhou',
      53: 'Yunnan',
      54: 'Xizang',
      61: 'Shaanxi',
      62: 'Gansu',
      63: 'Qinghai',
      64: 'Ningxia',
      65: 'Xinjiang',
      71: 'Taiwan',
      81: 'Hong Kong',
      82: 'Macau',
      91: 'Foreign'
    };

    if (provinces[ID.substr(0, 2)] === undefined) {
      results.valid = false;
    }

    // velidate birthday
    var birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2));
    var d = new Date(birthday);
    var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate());
    var currentTime = new Date().getTime();
    var time = d.getTime();

    if (time >= currentTime || birthday !== newBirthday) {
      results.valid = false;
    } else {
      results.birthday = d;
    }

    // validate verification code
    var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    var sum = 0;
    var residue;

    for (var i = 0; i < 17; i++) {
      sum += ID.substr(i, 1) * arrInt[i];
    }
    residue = arrCh[sum % 11];
    if (residue !== ID.substr(17, 1).toUpperCase()) {
      results.valid = false;
      results.verificationCode = residue;
    } else {
      results.gender = Number(ID.substr(16, 1)) % 2;
    }

    return results;
  }
}
