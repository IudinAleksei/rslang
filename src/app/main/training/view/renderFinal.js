import '../sass/finalPage.scss';
import { ELEMENTS_CLASSES, MESSAGES } from '../../../common/constants';
import buttonClickHandler from '../controls/finalPageControl';

const createStatsString = (description, value) => {
  const statsString = document.createElement('div');
  const nameOfString = document.createElement('span');
  const valueOfString = document.createElement('span');

  statsString.classList.add(ELEMENTS_CLASSES.trainingShortStatsString);
  nameOfString.classList.add(ELEMENTS_CLASSES.trainingShortStatsDescription);
  valueOfString.classList.add(ELEMENTS_CLASSES.trainingShortStatsValue);

  nameOfString.innerText = description;
  valueOfString.innerText = value;

  statsString.append(nameOfString);
  statsString.append(valueOfString);
  return statsString;
};

const renderShortTermStats = (statsValues) => {
  const finalMessage = document.querySelector(`.${ELEMENTS_CLASSES.trainingFinalMessage}`);
  finalMessage.innerHTML = '';

  const statsTitle = document.createElement('h2');
  statsTitle.classList.add(ELEMENTS_CLASSES.trainingShortStatsTitle);
  statsTitle.innerText = MESSAGES.trainingStatsTitle;

  finalMessage.append(statsTitle);

  const statsArray = Object.entries(statsValues);
  statsArray.forEach((entry) => {
    const description = MESSAGES[entry[0]];
    const value = entry[1];
    const statsString = createStatsString(description, value);
    finalMessage.append(statsString);
  });
};

const createButtons = () => {
  const shortTermStatsBtn = document.createElement('button');
  shortTermStatsBtn.classList.add(ELEMENTS_CLASSES.trainingShortStatsBtn);
  shortTermStatsBtn.innerText = MESSAGES.trainingShortStatsBtn;

  return shortTermStatsBtn;
};

const createFinalMessage = (statsValues) => {
  const finalMessage = document.createElement('div');
  finalMessage.classList.add(ELEMENTS_CLASSES.trainingFinalMessage);

  const finalTitle = document.createElement('h2');
  finalTitle.classList.add(ELEMENTS_CLASSES.trainingFinalTitle);
  finalTitle.innerText = MESSAGES.trainingFinalTitle;

  const finalText = document.createElement('p');
  finalText.classList.add(ELEMENTS_CLASSES.trainingFinalText);
  finalText.innerText = MESSAGES.trainingFinalText;

  const btn = createButtons();
  const wrapperOfRenderShortTermStats = () => { renderShortTermStats(statsValues); };
  buttonClickHandler(btn, wrapperOfRenderShortTermStats);

  finalMessage.append(finalTitle);
  finalMessage.append(finalText);
  finalMessage.append(btn);

  return finalMessage;
};

const renderFinalPage = (statsValues = {
  trainingAllCards: 0,
  trainingRightCards: '0%',
  trainingNewCards: 0,
  trainingCardSeries: 0,
}) => {
  const mainContainer = document.querySelector(`.${ELEMENTS_CLASSES.mainContainer}`);

  const finalContainer = document.createElement('div');
  finalContainer.classList.add(ELEMENTS_CLASSES.trainingFinalPage);

  const finalMessage = createFinalMessage(statsValues);

  finalContainer.append(finalMessage);

  mainContainer.append(finalContainer);
};

export default renderFinalPage;
