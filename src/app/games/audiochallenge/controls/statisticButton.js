import renderAudiochallengeStartPage from '../view/startPage';
import renderSettings from '../../../main/settings/index';

export default function statisticButton() {
  const againButton = document.querySelector('.button-again');
  const mainPageButton = document.querySelector('.button-main-page');
  againButton.addEventListener('click', renderAudiochallengeStartPage);
  mainPageButton.addEventListener('click', renderSettings);
}
