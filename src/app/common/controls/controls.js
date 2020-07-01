import menuHandlers from './menuHandlers';
import renderSettings from '../../main/settings/index';

function menuClickHandler(loginResponse) {
  document.querySelector('.menu').addEventListener('click', (event) => {
    const el = event.target.closest('.menu__items__item');
    if (el) {
      const functionName = el.dataset.handler;
      if (functionName !== undefined) {
        menuHandlers[functionName](loginResponse);
      } else {
        // eslint-disable-next-line no-alert
        alert('эта страница еще не создана');
      }
    }
  });
}
const startMain = (loginRsponse) => {
  renderSettings();
  menuClickHandler(loginRsponse);
};

export default startMain;
