import menuHandling from './app/main/menu/menu';
import startMain from './app/common/controls/controls';
/* import { showForm, formHandling } from './app/main/authorization/index'; */

window.onload = () => {
  menuHandling();
  startMain();
/*   showForm();
  formHandling(startMain); */
};
