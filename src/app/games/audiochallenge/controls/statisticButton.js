import renderAudiochallengeStartPage from '../view/startPage';

export default function statisticButton(loginResponse) {
  const againButton = document.querySelector('.audiochallenge__button-again');
  againButton.addEventListener('click', () => renderAudiochallengeStartPage(loginResponse));
}
