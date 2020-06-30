/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { getWords } from '../../common/network/backendWords/backendWords';
import getMedia from '../../common/utils/githubMedia';
import getRandomInteger from '../../common/utils/randomInteger';

export default async function sprintGamePageHandling() {
  const body = document.querySelector('body');
  const word = document.querySelector('.word');
  const translation = document.querySelector('.translation');
  const points = document.querySelector('.points');
  const wordSound = document.querySelector('.word-sound');
  const soundButton = document.querySelector('.sound-button');
  const circles = document.querySelectorAll('.circle');
  const birds = document.querySelectorAll('.parrot');
  const correctButton = document.querySelector('.sprint-game__correct');
  const incorrectButton = document.querySelector('.sprint-game__wrong');
  const extraPoints = document.querySelector('.extra-points');
  const group = 1;
  let page = getRandomInteger(1, 22);
  console.log(page);

  body.className = 'body__spring-game-page';

  const pointsConfig = [10, 20, 40, 80];
  const gameStates = {
    currentLevel: pointsConfig[0],
    correctAnswers: 0,
    words: [],
    currentWord: {},
  };

  function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  async function getMixedArrayOfWords() {
    const data = await getWords(group, page);
    for (let i = 0; i < data.length; i++) {
      data[i].isAnswerCorrect = true;
    }
    const numberOfIncorrectWords = getRandomInteger(2, 3);
    for (let i = 0; i <= numberOfIncorrectWords + 2;) {
      const first = data[i].wordTranslate;
      const next = data[i + 1].wordTranslate;
      const buffer = first;
      data[i].wordTranslate = next;
      data[i + 1].wordTranslate = buffer;
      data[i].isAnswerCorrect = false;
      data[i + 1].isAnswerCorrect = false;
      i += 2;
    }
    return shuffle(data);
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

  function removeCircleClasses(className) {
    circles.forEach((el) => {
      el.classList.remove(className);
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
      removeCircleClasses('green-circle');
      levelUp(0, 1);
      extraPoints.innerText = '+ 20 points';
    } else if (gameStates.correctAnswers === 5) {
      addPoints(0, 1);
    } else if (gameStates.correctAnswers === 6) {
      addPoints(1, 1);
    } else if (gameStates.correctAnswers === 7) {
      addPoints(2, 1);
    } else if (gameStates.correctAnswers === 8) {
      removeCircleClasses('green-circle');
      levelUp(1, 2);
      extraPoints.innerText = '+ 40 points';
    } else if (gameStates.correctAnswers === 9) {
      addPoints(0, 2);
    } else if (gameStates.correctAnswers === 10) {
      addPoints(1, 2);
    } else if (gameStates.correctAnswers === 11) {
      addPoints(2, 2);
    } else if (gameStates.correctAnswers === 12) {
      levelUp(2, 3);
      Array.from(circles)[0].classList.add('hidden-circle');
      Array.from(circles)[2].classList.add('hidden-circle');
      extraPoints.innerText = '+ 80 points';
    } else if (gameStates.correctAnswers > 12) {
      maxLevel();
    }
  }

  function resetCorrectAnswers() {
    gameStates.correctAnswers = 0;
    removeCircleClasses('green-circle');
    removeCircleClasses('hidden-circle');
    extraPoints.innerText = '';
    birds.forEach((el) => {
      el.classList.remove('active-parrot');
    });
  }

  async function loadNewWords() {
    const words = await getMixedArrayOfWords();
    console.log(words);
    gameStates.words.push(...words);
  }

  function incrementCurrentWord() {
    const shiftedWord = gameStates.words.shift();
    console.log(`shiftedWord >>>${shiftedWord}`);
    gameStates.currentWord = shiftedWord;
    console.log(`gameStates.currentWord >>>${gameStates.currentWord}`);
  }

  async function setCardData() {
    word.innerText = gameStates.currentWord.word;
    translation.innerText = gameStates.currentWord.wordTranslate;
  }

  async function nextWord() {
    console.log('зашла в nextWord()');
    if (gameStates.words.length === 0) {
      await loadNewWords();
    } else if (gameStates.words.length === 3) {
      console.log('осталось меньше 3-х слов');
      page += 1;
      await loadNewWords();
    }
    incrementCurrentWord();
    setCardData();
  }

  function onSoundClick() {
    console.log('click on sound');
    const pathToMedia = getMedia(gameStates.currentWord.audio);
    wordSound.src = pathToMedia;
    playAudio(pathToMedia);
  }

  function onCorrectButtonClick() {
    console.log('click on correct');
    if (gameStates.currentWord.isAnswerCorrect === true) {
      incrementCorrectAnswer();
    } else {
      resetCorrectAnswers();
    }
    nextWord();
  }

  function onIncorrectButtonClick() {
    console.log('click on INcorrect');
    if (gameStates.currentWord.isAnswerCorrect === false) {
      incrementCorrectAnswer();
    } else {
      resetCorrectAnswers();
    }
    nextWord();
  }

  function addEventListeners() {
    soundButton.addEventListener('click', onSoundClick);
    correctButton.addEventListener('click', onCorrectButtonClick);
    incorrectButton.addEventListener('click', onIncorrectButtonClick);
  }

  nextWord();
  addEventListeners();
}
