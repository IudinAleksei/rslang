import menuHandlers from './menuHandlers';
import { renderSettings, setSettingsBackend } from '../../main/settings/index';
import {
  hideHeader,
  hideMain,
  clearBodyClasses,
  regenerateMainContainer,
  deleteSessionData,
} from '../index';
import authorization from '../../main/authorization/index';

const CURRENT_STATE = {
  page: 'renderSettings',
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
        document.body.addEventListener('transitionend', () => {
          clearBodyClasses();
          regenerateMainContainer();
          menuHandlers[functionName](loginResponse);
          CURRENT_STATE.page = functionName;
          hideMain(false);
        }, {
          once: true,
        });
      }
    }
  });
}

const startMain = (loginResponse) => {
  hideMain(true);
  document.body.addEventListener('transitionend', () => {
    clearBodyClasses();
    regenerateMainContainer();
    hideMain(false);
    hideHeader(false);
    renderSettings();
  }, {
    once: true,
  });
  menuClickHandler(loginResponse);
  // eslint-disable-next-line no-use-before-define
  logoutClickHandler(loginResponse);
};

function logoutClickHandler(loginResponse) {
  document.querySelector('#authorization__log-out').addEventListener('click', () => {
    hideMain(true);
    document.body.addEventListener('transitionend', () => {
      setSettingsBackend(loginResponse);
      deleteSessionData('authorized');
      clearBodyClasses();
      regenerateMainContainer();
      hideMain(false);
      hideHeader(true);
      authorization(startMain);
    }, {
      once: true,
    });
  });
}

export default startMain;
