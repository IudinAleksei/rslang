import menuHandling from './app/main/menu/menu';
import generatePageAboutUs from './app/main/about_team/index';

window.onload = () => {
  menuHandling();
  generatePageAboutUs();
};
