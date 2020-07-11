import menuHandling from './app/main/menu/menu';
import renderAudiochallengeStartPage from './app/games/audiochallenge/index'
// import startMain from './app/common/controls/controls';
// import { showForm, formHandling } from './app/main/authorization/index';

window.onload = () => {
  menuHandling();
  renderAudiochallengeStartPage();
  // showForm();
  // formHandling(startMain);
};
