import menuHandling from './app/main/menu/menu';
import startMain from './app/common/controls/controls';
import authorization from './app/main/authorization/index';

window.onload = () => {
  menuHandling();
  authorization(startMain);
};
