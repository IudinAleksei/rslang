import { ELEMENTS_CLASSES, MESSAGES, INTERVALS } from '../../../common/constants';

const toDateAndTime = (ms) => {
  const date = new Date(ms);
  const result = date.toLocaleString('en', {
    month: 'short',
    day: 'numeric',
    hour12: 0,
    hour: '2-digit',
    minute: '2-digit',
  });

  return result;
};

const getNextDate = (ms, counter) => {
  if (typeof INTERVALS[counter] !== 'number') {
    return MESSAGES.dictionaryNextDateNever;
  }
  const nextMs = +ms + (+INTERVALS[counter] * 1000);
  const MsInMinute = 60000;

  if (nextMs < (Date.now() + MsInMinute)) {
    return MESSAGES.dictionaryNextDateNearest;
  }

  const result = toDateAndTime(nextMs);

  return result;
};

export const hideTableRow = (row) => {
  row.classList.add(ELEMENTS_CLASSES.dictionaryHideTableRow);
};

const createTableRow = (wordObject, needRecoveryBtn = false) => {
  const row = document.createElement('div');
  row.classList.add(ELEMENTS_CLASSES.dictionaryTableRow);
  row.dataset.wordId = wordObject.userWord.wordId;

  const wordContainer = document.createElement('div');

  if (needRecoveryBtn) {
    const recoveryButton = document.createElement('button');

    recoveryButton.classList.add(ELEMENTS_CLASSES.dictionaryRecoveryBtn);

    row.append(recoveryButton);
  }

  const playButton = document.createElement('button');
  playButton.classList.add(ELEMENTS_CLASSES.dictionaryPlayBtn);

  const audio = new Audio();
  audio.src = `data:audio/mpeg;base64,${wordObject.wordData.audio}`;

  const word = document.createElement('p');
  word.classList.add(ELEMENTS_CLASSES.dictionaryRowWord);
  word.innerText = wordObject.wordData.word;

  const wordTranslate = document.createElement('p');
  wordTranslate.innerText = wordObject.wordData.wordTranslate;

  const transcription = document.createElement('p');
  transcription.innerText = wordObject.wordData.transcription;

  wordContainer.append(playButton);
  wordContainer.append(audio);
  wordContainer.append(word);
  wordContainer.append(transcription);
  wordContainer.append(wordTranslate);

  const sentenceContainer = document.createElement('div');
  sentenceContainer.classList.add(ELEMENTS_CLASSES.dictionaryRowSentence);

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
  const nextDateValue = getNextDate(wordObject.userWord.optional.date,
    wordObject.userWord.optional.counter);
  nextDate.innerText = `${MESSAGES.dictionaryNextDate}${nextDateValue}`;

  const indicator = document.createElement('div');
  indicator.classList.add(ELEMENTS_CLASSES.dictionaryWordIndicator);
  const progressInPercent = (+wordObject.userWord.optional.counter / +INTERVALS.total) * 100;
  indicator.style = `background: linear-gradient(90deg, #1ab429 0%, #1ab429 ${progressInPercent}%, transparent ${progressInPercent + 5}%);`;

  infoContainer.append(repeat);
  infoContainer.append(indicator);
  infoContainer.append(lastDate);
  infoContainer.append(nextDate);

  const image = new Image();
  image.classList.add(ELEMENTS_CLASSES.dictionaryRowImage);
  image.src = `data:image/jpg;base64,${wordObject.wordData.image}`;

  row.append(image);

  const textContainer = document.createElement('div');
  textContainer.classList.add(ELEMENTS_CLASSES.dictionaryRowTextContainer);

  textContainer.append(wordContainer);
  textContainer.append(sentenceContainer);
  textContainer.append(infoContainer);

  row.append(textContainer);

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
