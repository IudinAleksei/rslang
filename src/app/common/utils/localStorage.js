import { DEFAULT_LOCAL_DATA } from '../constants';

const hasSavedLocalData = () => {
  const dataNameArray = Object.keys(DEFAULT_LOCAL_DATA);
  const result = dataNameArray.every((entry) => !!window.localStorage.getItem(entry));
  return result;
};

const setDefaultLocalData = () => {
  const defaultArray = Object.entries(DEFAULT_LOCAL_DATA);
  defaultArray.forEach((defEntry) => {
    window.localStorage.setItem(...defEntry);
  });
};

export const setLocalData = (data = {}) => {
  if (data) {
    const dataArray = Object.entries(data);
    dataArray.forEach((entry) => {
      window.localStorage.setItem(...entry);
    });
  }
  return !!data;
};

export const getLocalData = () => {
  const dataNameArray = Object.keys(DEFAULT_LOCAL_DATA);
  const result = dataNameArray.reduce((acc, param) => {
    const entry = {};
    entry[param] = window.localStorage.getItem(param);
    return Object.assign(acc, entry);
  }, {});
  return result;
};

export const getAndInitLocalData = () => {
  if (!hasSavedLocalData()) {
    setDefaultLocalData();
  }

  const sessionData = getLocalData();
  return sessionData;
};
