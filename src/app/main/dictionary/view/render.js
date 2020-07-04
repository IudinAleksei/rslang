/* eslint-disable import/prefer-default-export */
import { ELEMENTS_CLASSES } from '../../../common/constants';

export const renderDictionary = () => {
  const mainContainer = document.querySelector(`.${ELEMENTS_CLASSES.mainContainer}`);

  const dict = document.createElement('div');
  dict.classList.add(ELEMENTS_CLASSES.dictionary);

  mainContainer.append(dict);
};
