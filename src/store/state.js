export function saveTemp(key, value) {
  return window.sessionStorage.setItem(key, JSON.stringify(value));
}

export function getTemp(key) {
  const value = window.sessionStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
}

export function removeTemp(key) {
  window.sessionStorage.removeItem(key);
}

export function clearTemp() {
  window.sessionStorage.clear();
}

export function savePersist(key, value) {
  return window.localStorage.setItem(key, JSON.stringify(value));
}

export function getPersist(key) {
  const value = window.localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
}
