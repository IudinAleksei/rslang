import menuHandling from './app/main/menu/menu';
import menuClickHandler from './app/common/controls/controls';

import createStartPage from './app/games/audiochallenge/view/startPage';

window.onload = () => {
  menuHandling();
  menuClickHandler();
};

createStartPage();
