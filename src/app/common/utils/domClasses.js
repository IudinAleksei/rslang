import { ELEMENTS_CLASSES } from '../constants';

export const clearBodyClasses = () => {
  document.body.removeAttribute('class');
};

export const regenerateMainContainer = () => {
  const mainContainer = document.querySelector(`.${ELEMENTS_CLASSES.mainContainer}`);
  mainContainer.remove();

  const newMainContainer = document.createElement('div');
  newMainContainer.classList.add(ELEMENTS_CLASSES.mainContainer);

  const main = document.querySelector(`.${ELEMENTS_CLASSES.main}`);
  main.append(newMainContainer);
};
