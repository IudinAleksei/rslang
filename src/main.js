import menuHandling from './app/main/menu/menu';
import errorHandling from './app/main/errorMessage/errorMessage';
import startMain from './app/common/controls/controls';
import authorization from './app/main/authorization/index';

window.onload = () => {
  menuHandling();
  errorHandling();
  showForm();
  formHandling(startMain);
  authorization(startMain);
};
