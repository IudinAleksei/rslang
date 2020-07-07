import '../sass/finalPage.scss';
import { ELEMENTS_CLASSES, MESSAGES } from '../../../common/constants';

const renderFinalPage = () => {
  const mainContainer = document.querySelector(`.${ELEMENTS_CLASSES.mainContainer}`);

  const finalContainer = document.createElement('div');
  finalContainer.classList.add(ELEMENTS_CLASSES.trainingFinalPage);

  const finalMessage = document.createElement('div');
  finalMessage.classList.add(ELEMENTS_CLASSES.trainingFinalMessage);

  const finalTitle = document.createElement('h2');
  finalTitle.classList.add(ELEMENTS_CLASSES.trainingFinalTitle);
  finalTitle.innerText = MESSAGES.trainingFinalTitle;

  const finalText = document.createElement('p');
  finalText.classList.add(ELEMENTS_CLASSES.trainingFinalText);
  finalText.innerText = MESSAGES.trainingFinalText;

  finalMessage.append(finalTitle);
  finalMessage.append(finalText);
  finalContainer.append(finalMessage);
  mainContainer.append(finalContainer);
};

export default renderFinalPage;
