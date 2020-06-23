import menuHandling from './app/main/menu/menu';
import renderSettings from './app/main/settings/index';
import renderMenuItem from './app/common/controls/controls';

window.onload = () => {
  menuHandling();
  renderSettings(); // this is the first page user sees after login
  renderMenuItem();
};
