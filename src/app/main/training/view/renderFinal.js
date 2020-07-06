import '../sass/finalPage.scss';
import { ELEMENTS_CLASSES } from '../../../common/constants';

const renderFinalPage = () => {
  const mainContainer = document.querySelector(`.${ELEMENTS_CLASSES.mainContainer}`);

  const finalContainer = document.createElement('div');
  finalContainer.classList.add(ELEMENTS_CLASSES.trainingFinalPage);

  const finalMessage = document.createElement('div');
  finalMessage.classList.add(ELEMENTS_CLASSES.trainingFinalMessage);

  finalContainer.append(finalMessage);
  mainContainer.append(finalContainer);
};

export default renderFinalPage;
