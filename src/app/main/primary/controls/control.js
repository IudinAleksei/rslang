import { compareWord, nextWord, updateWord } from '../logicMainGame';

function mainGameHandling() {
  document.querySelector('.main-container').addEventListener('click', (event) => {
    updateWord(event);
    if (event.target.className === 'enter') {
      compareWord();
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
    document.querySelector('.input').focus();
    if (event.key === 'Enter') {
      event.preventDefault();
      compareWord();
    }
  }, false);
  document.addEventListener('keydown', () => {
    document.querySelector('.input').focus();
  }, false);
}

export default mainGameHandling;
