import menuHandling from './app/main/menu/menu';
// import startMain from './app/common/controls/controls';
// import { showForm, formHandling } from './app/main/authorization/index';
import generatePageAboutUs from './app/main/about_team/index';

window.onload = () => {
  menuHandling();
  generatePageAboutUs();
  // showForm();
  // formHandling(startMain);
};
