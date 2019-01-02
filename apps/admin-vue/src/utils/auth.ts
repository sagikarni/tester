// import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';

export function getToken() {
  // return Cookies.get(TokenKey);
  return '';
}

export function setToken(token: string) {
  // return Cookies.set(TokenKey, token);
  return null;
}

export function removeToken() {
  // return Cookies.remove(TokenKey);
  return null;
}
