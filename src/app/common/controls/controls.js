import menuHandlers from './menuHandlers';
import renderSettings from '../../main/settings/index';
import { hideHeader, hideMain, clearBodyClasses } from '../index';

const CURRENT_STATE = {
  page: '',
};

function menuClickHandler(loginResponse) {
  document.querySelector('.menu').addEventListener('click', (event) => {
    const el = event.target.closest('.menu__items__item');
    if (el) {
      const functionName = el.dataset.handler;
      if (functionName === CURRENT_STATE.page) {
        return;
      }
      if (functionName !== undefined) {
        hideMain(true);
        clearBodyClasses();
        document.body.addEventListener('transitionend', () => {
          menuHandlers[functionName](loginResponse);
          CURRENT_STATE.page = functionName;
          hideMain(false);
        }, { once: true });
      } else {
        // eslint-disable-next-line no-alert
        alert('эта страница еще не создана');
      }
    }
  });
}
const startMain = (loginResponse) => {
  hideMain(true);
  document.body.addEventListener('transitionend', () => {
    hideMain(false);
  }, { once: true });
  clearBodyClasses();
  hideHeader(false);
  renderSettings();
  menuClickHandler(loginResponse);
};

export default startMain;
