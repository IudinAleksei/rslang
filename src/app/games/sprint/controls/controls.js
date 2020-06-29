/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { getWords } from '../../../common/network/backendWords/backendWords';
import getMedia from '../../../common/utils/githubMedia';
import getRandomInteger from '../../../common/utils/randomInteger';

export default function springGamePageHandling() {
  const body = document.querySelector('body');
  const word = document.querySelector('.word');
  const translation = document.querySelector('.translation');
  const points = document.querySelector('.points');
  const wordSound = document.querySelector('.word-sound');
  const soundButton = document.querySelector('.sound-button');
  const buttons = document.querySelector('.buttons-section');
  const circles = document.querySelectorAll('.circle');
  const birds = document.querySelectorAll('.parrot');
  body.classList.add('body__settings-page');
  const pointsConfig = [10, 20, 40, 80];
  const gameStates = {
    currentLevel: pointsConfig[0],
    correctAnswers: 0,
  };

  function shuffle(array) {
    let currentIndex = array.length; let temporaryValue; let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  function playAudio(src) {
    const audioElement = new Audio(src);
    audioElement.play();
  }

  function addPoints(circleNumber, gameLevel) {
    Array.from(circles)[circleNumber].classList.add('green-circle');
    gameStates.currentLevel = pointsConfig[gameLevel];
    const pointsValue = Number(points.innerText) + gameStates.currentLevel;
    points.innerText = pointsValue;
  }

  function removeCircleClasses() {
    circles.forEach((el) => {
      el.classList.remove('green-circle');
    });
  }

  function levelUp(gameLevel, counterOfBirds) {
    gameStates.currentLevel = pointsConfig[gameLevel];
    const pointsValue = Number(points.innerText) + gameStates.currentLevel;
    points.innerText = pointsValue;
    Array.from(birds)[counterOfBirds].classList.add('active-parrot');
  }

  function maxLevel() {
    gameStates.currentLevel = pointsConfig[3];
    const pointsValue = Number(points.innerText) + gameStates.currentLevel;
    points.innerText = pointsValue;
  }

  function incrementCorrectAnswer() {
    gameStates.correctAnswers += 1;
    if (gameStates.correctAnswers === 1) {
      addPoints(0, 0);
    } else if (gameStates.correctAnswers === 2) {
      addPoints(1, 0);
    } else if (gameStates.correctAnswers === 3) {
      addPoints(2, 0);
    } else if (gameStates.correctAnswers === 4) {
      removeCircleClasses();
      levelUp(0, 1);
    } else if (gameStates.correctAnswers === 5) {
      addPoints(0, 1);
    } else if (gameStates.correctAnswers === 6) {
      addPoints(1, 1);
    } else if (gameStates.correctAnswers === 7) {
      addPoints(2, 1);
    } else if (gameStates.correctAnswers === 8) {
      removeCircleClasses();
      levelUp(1, 2);
    } else if (gameStates.correctAnswers === 9) {
      addPoints(0, 2);
    } else if (gameStates.correctAnswers === 10) {
      addPoints(1, 2);
    } else if (gameStates.correctAnswers === 11) {
      addPoints(2, 2);
    } else if (gameStates.correctAnswers === 12) {
      levelUp(2, 3);
    } else if (gameStates.correctAnswers > 12) {
      maxLevel();
    }
  }

  function resetCorrectAnswers() {
    gameStates.correctAnswers = 0;
    removeCircleClasses();
    birds.forEach((el) => {
      el.classList.remove('active-parrot');
    });
  }

  async function getArrayOfWords(group, page) {
    const data = await getWords(group, page);

    for (let i = 0; i < data.length; i++) {
      data[i].isAnswerCorrect = true;
    }

    const numberOfIncorrectWords = getRandomInteger(2, 3);

    for (let i = 0; i <= numberOfIncorrectWords + 2;) {
      const first = data[i].wordTranslate;
      const next = data[i + 1].wordTranslate;
      const buffer = first;
      data[i].wordTranslate = `${next}`;
      data[i + 1].wordTranslate = `${buffer}`;
      data[i].isAnswerCorrect = false;
      data[i + 1].isAnswerCorrect = false;
      i += 2;
    }
    return shuffle(data);
  }

  async function renderCards(group, page) {
    const data = await getArrayOfWords(group, page);
    console.log(data);
    word.innerText = data[0].word;
    translation.innerText = data[0].wordTranslate;
    const pathToMedia = getMedia(data[0].audio);
    wordSound.src = pathToMedia;
    soundButton.addEventListener('click', () => {
      playAudio(pathToMedia);
    });
    buttons.addEventListener('click', (event) => {
      const correctButton = event.target.closest('.sprint-game__correct');
      const incorrectButton = event.target.closest('.sprint-game__wrong');
      if (correctButton) {
        if (data[0].isAnswerCorrect === true) {
          incrementCorrectAnswer();
        } else {
          resetCorrectAnswers();
        }
      } else if (incorrectButton) {
        if (data[0].isAnswerCorrect === false) {
          incrementCorrectAnswer();
        } else {
          resetCorrectAnswers();
        }
      }
    });
  }

  renderCards(1, 1);
}
