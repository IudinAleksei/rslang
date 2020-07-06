import { compareWord, nextWord } from '../logicMainGame';

function mainGameHandling() {
  document.querySelector('.main-container').addEventListener('click', (event) => {
    if (event.target.className === 'enter') {
      compareWord();
    }
    if (event.target.className === 'show-answer') {
      document.querySelector('.input-background').style.opacity = 1;
      nextWord();
    }
  });
  document.querySelector('.main-container').addEventListener('focus', () => {
    document.querySelector('.input-background').style.opacity = 0;
  });
  document.querySelector('.main-container').addEventListener('input', () => {
    document.querySelector('.input-background').style.opacity = 0;
  });
  document.querySelector('.main-container').addEventListener('submit', (event) => {
    event.preventDefault();
    compareWord();
  });
  document.addEventListener('keydown', () => {
    document.querySelector('.write-word').focus();
  });
}

export default mainGameHandling;
