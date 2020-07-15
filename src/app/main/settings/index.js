/* eslint-disable import/no-cycle */
import './sass/style.scss';
import addSettingsHtml from './view/view';
import {
  upsertUserSettings,
  getLocalData,
} from '../../common/index';
import sliderSettingsPageHandling from './controls/controls';

function renderSettings() {
  addSettingsHtml();
  sliderSettingsPageHandling();
}

async function setSettingsBackend(loginResponse) {
  const settingsUserOption = getLocalData();
  const settingsUser = {
    wordsPerDay: settingsUserOption.newWord,
    optional: settingsUserOption,
  };
  await upsertUserSettings(loginResponse.token,
    loginResponse.userId, settingsUser);
}

export {
  renderSettings,
  setSettingsBackend,
};
