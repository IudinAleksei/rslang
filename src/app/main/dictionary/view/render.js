/* eslint-disable import/prefer-default-export */
import { ELEMENTS_CLASSES } from '../../../common/constants';

const createTabButton = (name) => {
  const btn = document.createElement('button');

  btn.classList.add(ELEMENTS_CLASSES.dictionaryBtn);

  btn.innerText = name;

  return btn;
};

export const renderDictionary = () => {
  const mainContainer = document.querySelector(`.${ELEMENTS_CLASSES.mainContainer}`);

  const dict = document.createElement('div');
  dict.classList.add(ELEMENTS_CLASSES.dictionary);

  const studiedBtn = createTabButton('Studied words');

  dict.append(studiedBtn);

  mainContainer.append(dict);
};
