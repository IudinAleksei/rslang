/* eslint-disable import/prefer-default-export */
import { ELEMENTS_CLASSES, MESSAGES } from '../../../common/constants';

const createTableRow = (wordObject) => {
  const row = document.createElement('div');
  row.classList.add(ELEMENTS_CLASSES.dictionaryTableRow);

  const wordContainer = document.createElement('div');

  const playButton = document.createElement('button');

  const audio = new Audio();
  audio.src = `data:audio/mpeg;base64,${wordObject.audio}`;

  const word = document.createElement('p');
  word.innerText = wordObject.word;

  const wordTranslate = document.createElement('p');
  wordTranslate.innerText = wordObject.wordTranslate;

  const transcription = document.createElement('p');
  transcription.innerText = wordObject.transcription;

  wordContainer.append(playButton);
  wordContainer.append(audio);
  wordContainer.append(word);
  wordContainer.append(wordTranslate);
  wordContainer.append(transcription);

  const sentenceContainer = document.createElement('div');

  const textExample = document.createElement('p');
  textExample.innerHTML = wordObject.textExample;

  const textMeaning = document.createElement('p');
  textMeaning.innerText = wordObject.textMeaning;

  sentenceContainer.append(textExample);
  sentenceContainer.append(textMeaning);

  const infoContainer = document.createElement('div');

  const repeat = document.createElement('p');
  repeat.innerText = `${MESSAGES.dictionaryRepetitions}${wordObject.optional.counter}`;

  const lastDate = document.createElement('p');
  lastDate.innerText = `${MESSAGES.dictionaryLastDate}${wordObject.optional.date}`;

  infoContainer.append(repeat);
  infoContainer.append(lastDate);

  const image = new Image();
  image.src = `data:image/jpg;base64,${wordObject.image}`;

  row.append(image);
  row.append(wordContainer);
  row.append(sentenceContainer);
  row.append(infoContainer);

  return row;
};

export const createDictTable = (dictionary, wordArray) => {
  const tableContainer = document.createElement('div');
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  tableContainer.classList.add(ELEMENTS_CLASSES.dictionaryTableContainer);
  table.classList.add(ELEMENTS_CLASSES.dictionaryTable);

  wordArray.forEach((word) => {
    const row = createTableRow(word);
    tbody.append(row);
  });

  table.append(tbody);
  tableContainer.append(table);
  dictionary.append(tableContainer);
};
