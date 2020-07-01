import { ELEMENTS_CLASSES } from '../constants';

export const hideHeader = (hide = true) => {
  const header = document.querySelector(`.${ELEMENTS_CLASSES.headerContainer}`);
  if (hide) {
    header.classList.add(ELEMENTS_CLASSES.hideHeaderContainer);
    return;
  }
  header.classList.remove(ELEMENTS_CLASSES.hideHeaderContainer);
};

export const hideMain = (hide = true) => {
  const header = document.querySelector(`.${ELEMENTS_CLASSES.headerContainer}`);
  if (hide) {
    header.classList.add(ELEMENTS_CLASSES.hideHeaderContainer);
    return;
  }
  header.classList.remove(ELEMENTS_CLASSES.hideHeaderContainer);
};
