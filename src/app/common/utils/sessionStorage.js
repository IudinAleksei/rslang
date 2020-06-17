import { PARAMS, DEFAULT_PARAMS } from '../constants';

const hasSavedParams = () => {
  const paramsArray = Object.values(PARAMS);
  const result = paramsArray.every((param) => !!window.sessionStorage.getItem(param));
  return result;
};

const setDefaultParams = () => {
  const defaultArray = Object.entries(DEFAULT_PARAMS);
  defaultArray.forEach((defParam) => {
    window.sessionStorage.setItem(...defParam);
  });
};

export const setParams = (score = 0) => {
  if (score) {
    window.sessionStorage.setItem([PARAMS.score], score);
  }
  return !!score;
};

export const getParams = () => {
  const paramsArray = Object.values(PARAMS);
  const result = paramsArray.map((param) => window.sessionStorage.getItem(param));
  return result;
};

export const getAndInitParams = () => {
  if (!hasSavedParams()) {
    setDefaultParams();
  }

  const params = getParams();
  return params;
};
