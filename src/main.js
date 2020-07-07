import menuHandling from './app/main/menu/menu';
import menuClickHandler from './app/common/controls/controls';
import createCardWord from './app/main/training/index';

window.onload = () => {
  menuHandling();
  menuClickHandler();
  createCardWord();
};
