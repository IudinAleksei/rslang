import menuHandling from './app/main/menu/menu';
import menuClickHandler from './app/common/controls/controls';
import { showForm, formHandling } from './app/main/authorization/index';

window.onload = () => {
  menuHandling();
  showForm();
  formHandling(menuClickHandler);
};
