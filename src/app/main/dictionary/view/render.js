/* eslint-disable import/prefer-default-export */
import { ELEMENTS_CLASSES } from '../../../common/constants';

const createTabButton = (name) => {
  const btn = document.createElement('button');

  btn.classList.add(ELEMENTS_CLASSES.dictionaryBtn);
  if (name === 'Studied words') {
    btn.classList.add(ELEMENTS_CLASSES.selectDictionaryBtn);
  }

  btn.innerText = name;

  return btn;
};

export const renderDictionary = () => {
  const mainContainer = document.querySelector(`.${ELEMENTS_CLASSES.mainContainer}`);
  const TAB_BUTTONS_NAME = ['Studied words', 'Difficult words', 'Deleited words'];

  document.body.classList.add(ELEMENTS_CLASSES.dictionaryBody);

  const dict = document.createElement('div');
  dict.classList.add(ELEMENTS_CLASSES.dictionary);
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add(ELEMENTS_CLASSES.dictionaryBtnContainer);

  TAB_BUTTONS_NAME.forEach((name) => {
    const studiedBtn = createTabButton(name);

    buttonContainer.append(studiedBtn);
  });

  dict.append(buttonContainer);

  mainContainer.append(dict);
};
