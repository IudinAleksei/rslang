/* eslint-disable no-unused-vars */
import { ELEMENTS_CLASSES } from '../../../common/constants';
import { renderDictionary } from '../view/renderDictionary';
import { createDictTable } from '../view/createTable';
import { readAllUserWords, getDifficultUserWords, getDeletedUserWords } from '../model/dictionaryLogic';

const currentState = {
  isAudioPlayed: false,
};

const playNearestAudio = (event) => {
  const tgt = event.target;
  if (tgt.classList.contains(ELEMENTS_CLASSES.dictionaryPlayBtn) && !currentState.isAudioPlayed) {
    const audio = tgt.parentNode.querySelector('audio');
    currentState.isAudioPlayed = true;
    audio.play();
    audio.addEventListener('ended', () => {
      currentState.isAudioPlayed = false;
    }, { once: true });
  }
};

const playButtonHandler = () => {
  const tableContainer = document.querySelector(`.${ELEMENTS_CLASSES.dictionaryTableContainer}`);

  tableContainer.addEventListener('click', playNearestAudio);
};

const clickOnTab = (event, userWords) => {
  const tgt = event.target;
  if (tgt.classList.contains(ELEMENTS_CLASSES.dictionaryBtn)) {
    if (event.target.innerText.toLowerCase() === 'studied words') {
      createDictTable(userWords);
    }

    if (event.target.innerText.toLowerCase() === 'difficult words') {
      const difficultWord = getDifficultUserWords(userWords);
      createDictTable(difficultWord, true);
    }

    if (event.target.innerText.toLowerCase() === 'deleted words') {
      const deletedWord = getDeletedUserWords(userWords);
      createDictTable(deletedWord, true);
    }
    playButtonHandler();
  }
};

const tabClickHandler = (userWords) => {
  const buttonContainer = document.querySelector(`.${ELEMENTS_CLASSES.dictionaryBtnContainer}`);

  const wrapperClickOnTab = (event) => {
    clickOnTab(event, userWords);
  };

  buttonContainer.addEventListener('click', wrapperClickOnTab);
};

const initDictionary = async (loginResponse) => {
  renderDictionary();
  const userWords = await readAllUserWords(loginResponse);
  tabClickHandler(userWords);
  // createDictTable(userWords);
};

export default initDictionary;
