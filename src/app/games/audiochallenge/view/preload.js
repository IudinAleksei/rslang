import startAudiochallengeGame from './startGame';

export default function preload(wordsArr) {
  document.querySelector('#audiochallenge').innerHTML = '';

  const preloadWrapper = document.createElement('div');
  preloadWrapper.classList.add('audiochallenge__preload');

  const timer = document.createElement('span');
  timer.classList.add('audiochallenge__timer');

  preloadWrapper.append(timer);

  const describeWrapper = document.createElement('div');
  describeWrapper.classList.add('audiochallenge__preload__describe__wrapper');

  const keyboardIco = document.createElement('div');
  keyboardIco.classList.add('audiochallenge__preload__keyboard-ico');

  const describe = document.createElement('span');
  describe.classList.add('audiochallenge__preload__describe');
  describe.textContent = 'Use keys 1, 2, 3 and 4 to give a quick answer';

  describeWrapper.append(keyboardIco, describe);

  document.querySelector('#audiochallenge').append(preloadWrapper, describeWrapper);

  timer.textContent = '3';

  const intervalTimer = setInterval(() => {
    let timerNum = timer.textContent;
    timerNum -= 1;
    timer.textContent = timerNum;
  }, 1000);

  setTimeout(() => {
    clearInterval(intervalTimer);
    startAudiochallengeGame(wordsArr);
  }, 3000);
}
