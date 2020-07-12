import renderAudiochallengeStartPage from '../view/startPage';

export default function statisticButton() {
  const againButton = document.querySelector('.button-again');
  againButton.addEventListener('click', renderAudiochallengeStartPage);
}
