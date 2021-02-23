const tokenKey = "userToken";
const userKey = "userKey";

export function saveToken(token) {
  saveToStorage(tokenKey, token);
}

export function getToken() {
  return getFromStorage(tokenKey);
}

export function saveUser(user) {
  saveToStorage(userKey, user);
}

export function getUsername() {
  const user = getFromStorage(userKey);

  if (user) {
    return user.username;
  }

  return null;
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function removeUserFromStorage(key, value) {
  localStorage.removeItem(key, JSON.stringify(value));
}

export function getFromStorage(key) {
  const value = localStorage.getItem(key);

  if (!value) {
    return [];
  }

  return JSON.parse(value);
}

export function removeUser(user) {
  removeUserFromStorage(userKey, user);
}

export function removeToken(token) {
  removeUserFromStorage(tokenKey, token);
}

export function Logout() {
  removeToken();
  removeUser();
  location.href = `index.html`;
}
