/* eslint-disable import/no-cycle */
import { compareWord, nextWord, updateWord } from '../logicMainGame';

function mainGameHandling() {
  document.querySelector('.main-container').addEventListener('click', (event) => {
    updateWord(event);
    if (event.target.className === 'enter') {
      compareWord();
    }
    if (event.target.closest('.sounds')) {
      if (localStorage.getItem('trainingSound') === 'true') {
        localStorage.setItem('trainingSound', 'false');
        document.querySelector('.sounds').classList.toggle('main-game_sound-on');
        document.querySelector('.sounds').classList.toggle('main-game_sound-off');
      } else {
        localStorage.setItem('trainingSound', 'true');
        document.querySelector('.sounds').classList.toggle('main-game_sound-on');
        document.querySelector('.sounds').classList.toggle('main-game_sound-off');
      }
    }
    if (event.target.className === 'show-answer') {
      document.querySelector('.input-background').style.opacity = 1;
      document.querySelector('.meaning-word i').style.opacity = 1;
      document.querySelector('.explanation-word').style.opacity = 1;
      document.querySelector('.translate-sentense').style.opacity = 1;
      nextWord();
    }
  }, false);
  document.querySelector('.main-container').addEventListener('focus', () => {
    document.querySelector('.input-background').style.opacity = 0;
  }, false);
  document.querySelector('.main-container').addEventListener('input', () => {
    document.querySelector('.input-background').style.opacity = 0;
  }, false);
  document.querySelector('.main-container').addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !document.querySelector('.block-enter')) {
      compareWord();
    }
  });

  document.addEventListener('keydown', () => {
    if (document.querySelector('.input')) {
      document.querySelector('.input').focus();
    }
  }, false);
}

export default mainGameHandling;
