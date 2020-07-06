import menuHandling from './app/main/menu/menu';
import renderFinalPage from './app/main/training/view/renderFinal';
// import startMain from './app/common/controls/controls';
// import { showForm, formHandling } from './app/main/authorization/index';

window.onload = () => {
  menuHandling();
  // showForm();
  // formHandling(startMain);
  renderFinalPage();
};
