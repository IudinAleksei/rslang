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
    const keyArray = Object.keys(DEFAULT_SESSION_DATA);
    keyArray.forEach((key) => {
      window.sessionStorage.setItem(key, data[key]);
    });
  }
  return !!data;
};

export const getSessionData = () => {
  const dataNameArray = Object.keys(DEFAULT_SESSION_DATA);
  const result = dataNameArray.map((param) => window.sessionStorage.getItem(param));
  return result;
};

export const getAndInitSessionData = () => {
  if (!hasSavedSessionData()) {
    setDefaultSessionData();
  }

  const sessionData = getSessionData();
  return sessionData;
};
