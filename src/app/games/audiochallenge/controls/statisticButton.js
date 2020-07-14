/* eslint-disable import/no-cycle */
import renderAudiochallengeStartPage from '../view/startPage';

export default function statisticButton() {
  const againButton = document.querySelector('.audiochallenge__button-again');
  againButton.addEventListener('click', () => renderAudiochallengeStartPage());
}
