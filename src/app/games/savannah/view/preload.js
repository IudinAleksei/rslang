/* eslint-disable import/no-cycle */
import startGame from './startGame';

export default function preload(wordsArr, loginResponse) {
  document.querySelector('#savannah').innerHTML = '';

  const preloadWrapper = document.createElement('div');
  preloadWrapper.classList.add('savannah__preload');

  const timer = document.createElement('span');
  timer.classList.add('savannah__timer');

  preloadWrapper.append(timer);

  const describeWrapper = document.createElement('div');
  describeWrapper.classList.add('savannah__preload__describe__wrapper');

  const keyboardIco = document.createElement('div');
  keyboardIco.classList.add('savannah__preload__keyboard-ico');

  const describe = document.createElement('span');
  describe.classList.add('savannah__preload__describe');
  describe.textContent = 'Use keys 1, 2, 3 and 4 to give a quick answer';

  describeWrapper.append(keyboardIco, describe);

  document.querySelector('#savannah').append(preloadWrapper, describeWrapper);

  timer.textContent = '3';

  const intervalTimer = setInterval(() => {
    let timerNum = timer.textContent;
    timerNum -= 1;
    timer.textContent = timerNum;
  }, 1000);

  setTimeout(() => {
    clearInterval(intervalTimer);
    startGame(wordsArr, loginResponse);
  }, 3000);
}
