/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { ELEMENTS_CLASSES, MESSAGES, INTERVALS } from '../../../common/constants';

const toDateAndTime = (ms) => {
  const date = new Date(ms);
  const result = date.toLocaleTimeString();

  return result;
};

const createTableRow = (wordObject, needRecoveryBtn = false) => {
  const row = document.createElement('div');
  row.classList.add(ELEMENTS_CLASSES.dictionaryTableRow);
  row.dataset.wordId = wordObject.userWord.wordId;

  const wordContainer = document.createElement('div');

  if (needRecoveryBtn) {
    const recoveryButton = document.createElement('button');

    recoveryButton.innerText = 'Recover';
    recoveryButton.classList.add(ELEMENTS_CLASSES.dictionaryRecoveryBtn);

    row.append(recoveryButton);
  }

  const playButton = document.createElement('button');
  playButton.innerText = 'play';
  playButton.classList.add(ELEMENTS_CLASSES.dictionaryPlayBtn);

  const audio = new Audio();
  audio.src = `data:audio/mpeg;base64,${wordObject.wordData.audio}`;

  const word = document.createElement('p');
  word.innerText = wordObject.wordData.word;

  const wordTranslate = document.createElement('p');
  wordTranslate.innerText = wordObject.wordData.wordTranslate;

  const transcription = document.createElement('p');
  transcription.innerText = wordObject.wordData.transcription;

  wordContainer.append(playButton);
  wordContainer.append(audio);
  wordContainer.append(word);
  wordContainer.append(wordTranslate);
  wordContainer.append(transcription);

  const sentenceContainer = document.createElement('div');

  const textExample = document.createElement('p');
  textExample.innerHTML = wordObject.wordData.textExample;

  const textMeaning = document.createElement('p');
  textMeaning.innerHTML = wordObject.wordData.textMeaning;

  sentenceContainer.append(textExample);
  sentenceContainer.append(textMeaning);

  const infoContainer = document.createElement('div');

  const repeat = document.createElement('p');
  repeat.innerText = `${MESSAGES.dictionaryRepetitions}${wordObject.userWord.optional.counter}`;

  const lastDate = document.createElement('p');
  const lastDateValue = toDateAndTime(wordObject.userWord.optional.date);
  lastDate.innerText = `${MESSAGES.dictionaryLastDate}${lastDateValue}`;

  const nextDate = document.createElement('p');
  nextDate.innerText = `${MESSAGES.dictionaryLastDate}${wordObject.userWord.optional.date}`;

  const indicator = document.createElement('div');

  infoContainer.append(repeat);
  infoContainer.append(lastDate);
  infoContainer.append(nextDate);
  infoContainer.append(indicator);

  const image = new Image();
  image.src = `data:image/jpg;base64,${wordObject.wordData.image}`;

  row.append(image);
  row.append(wordContainer);
  row.append(sentenceContainer);
  row.append(infoContainer);

  return row;
};

export const createDictTable = (wordArray, needRecoverBtn) => {
  const dictionary = document.querySelector(`.${ELEMENTS_CLASSES.dictionary}`);
  let prevTableContainer = document.querySelector(`.${ELEMENTS_CLASSES.dictionaryTableContainer}`);
  if (prevTableContainer) {
    prevTableContainer.remove();
    prevTableContainer = null;
  }

  const tableContainer = document.createElement('div');
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  tableContainer.classList.add(ELEMENTS_CLASSES.dictionaryTableContainer);
  table.classList.add(ELEMENTS_CLASSES.dictionaryTable);

  wordArray.forEach((word) => {
    const row = createTableRow(word, needRecoverBtn);
    tbody.append(row);
  });

  table.append(tbody);
  tableContainer.append(table);
  dictionary.append(tableContainer);
};
