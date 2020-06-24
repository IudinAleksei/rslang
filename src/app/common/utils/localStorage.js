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
