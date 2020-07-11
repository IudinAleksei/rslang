import menuHandling from './app/main/menu/menu';
// import startMain from './app/common/controls/controls';
// import { showForm, formHandling } from './app/main/authorization/index';
import renderAudiochallengeStartPage from './app/games/audiochallenge/index';

window.onload = () => {
  menuHandling();
  renderAudiochallengeStartPage();
  // showForm();
  // formHandling(startMain);
};
