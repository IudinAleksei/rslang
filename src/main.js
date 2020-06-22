import menuHandling from './app/main/menu/menu';
import renderSettingsPage from './app/main/settings/index';

window.onload = () => {
  menuHandling();
  renderSettingsPage();
};
