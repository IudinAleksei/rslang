import menuHandling from './app/main/menu/menu';
import menuClickHandler from './app/common/controls/controls';
import generatePageAboutUs from './app/main/about_team/index';

window.onload = () => {
  menuHandling();
  menuClickHandler();
  generatePageAboutUs();
};
