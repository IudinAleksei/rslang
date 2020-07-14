import { DEFAULT_SESSION_DATA } from '../constants';

const hasSavedSessionData = () => {
  const dataNameArray = Object.keys(DEFAULT_SESSION_DATA);
  const result = dataNameArray.every((entry) => !!window.sessionStorage.getItem(entry));
  return result;
};

const setDefaultSessionData = () => {
  const defaultArray = Object.entries(DEFAULT_SESSION_DATA);
  defaultArray.forEach((defEntry) => {
    window.sessionStorage.setItem(...defEntry);
  });
};

export const setSessionData = (data = {}) => {
  if (data) {
    const dataArray = Object.entries(data);
    dataArray.forEach((entry) => {
      window.sessionStorage.setItem(...entry);
    });
  }
  return !!data;
};

export const getSessionData = () => {
  const dataNameArray = Object.keys(DEFAULT_SESSION_DATA);
  const result = dataNameArray.reduce((acc, param) => {
    const entry = {};
    entry[param] = window.sessionStorage.getItem(param);
    return Object.assign(acc, entry);
  }, {});
  return result;
};

export const deleteSessionData = (data = '') => {
  if (data) {
    window.sessionStorage.removeItem(data);
  }
  return !!data;
};

export const getAndInitSessionData = () => {
  if (!hasSavedSessionData()) {
    setDefaultSessionData();
  }

  const sessionData = getSessionData();
  return sessionData;
};
