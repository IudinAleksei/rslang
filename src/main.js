import menuHandling from './app/main/menu/menu';
// import startMain from './app/common/controls/controls';
// import { showForm, formHandling } from './app/main/authorization/index';
import createCardWord from './app/main/training/index';

window.onload = () => {
  menuHandling();
  // showForm();
  // formHandling(startMain);
  createCardWord();
};
