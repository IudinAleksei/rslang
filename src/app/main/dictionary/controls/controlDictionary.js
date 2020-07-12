/* eslint-disable no-unused-vars */
import { ELEMENTS_CLASSES } from '../../../common/constants';
import { renderDictionary } from '../view/renderDictionary';
import { createDictTable } from '../view/createTable';
import { readAllUserWords } from '../model/dictionaryLogic';

const clickOnTab = (event) => {
  const tgt = event.target;
  if (tgt.classList.contains(ELEMENTS_CLASSES.selectDictionaryBtn)) {
    console.log(event.target.class);
  }
};

const tabClickHandler = () => {
  const buttonContainer = document.querySelector(`.${ELEMENTS_CLASSES.dictionaryBtnContainer}`);
  buttonContainer.addEventListener('click', clickOnTab);
};

const initDictionary = async (loginResponse) => {
  const dictionary = renderDictionary();
  const userWords = await readAllUserWords(loginResponse);
  tabClickHandler();
  createDictTable(dictionary, userWords);
};

export default initDictionary;
