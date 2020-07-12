/* eslint-disable no-underscore-dangle */
import fetchUrl from '../../common/network/backendWords/commonFetch';
import {
  createUserWord,
  updateUserWord, upsertUserSettings,
} from '../../common/network/backendWords/backendWords';
import getMedia from '../../common/utils/githubMedia';
import { getAndInitLocalData } from '../../common/index';
import createCardWord from '../training/view/cardWithWord';
import showInformationWord from './view/showInformationWord';
import renderFinalPage from '../training/view/renderFinal';

export async function getAllAggregatedWords(token, userId, wordsPerPage, filter) {
  const urlWords = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords?wordsPerPage=${wordsPerPage}&filter=${encodeURIComponent(JSON.stringify(filter))}`;
  const content = fetchUrl(urlWords, {
    method: 'GET',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    },
  });
  return content;
}

let word;
let results;
let arrayNewWords;
let arrayUserWords;
let arrayCommon;
let objectUserWord;
let counterCard = 0;
let isCorrectAnswer = true;
let counterCorrectAnswer = 0;
let counterSeriesCorrectAnswer = 0;
const arrayCorrectAnswer = [];
let tokens;
let usersId;
let quantityNewWords;
let quantityCards;
const newWord = {
  $or: [
    { userWord: null },
  ],
};
const filterUserWord = { $and: [{ 'userWord.difficulty': 'easy', 'userWord.optional.repeat': true, 'userWord.optional.delete': false }] };

export function playAudio(event) {
  return new Promise(((resolve) => {
    const myAudio = new Audio();
    myAudio.src = getMedia(event);
    myAudio.play();
    myAudio.addEventListener('ended', () => {
      resolve();
    });
  }));
}

export async function showCardWord(array) {
  document.querySelector('.main-container').innerHTML = '';
  isCorrectAnswer = true;
  counterCard += 1;
  console.log(array);
  word = array.shift();
  console.log(word);

  objectUserWord = {
    difficulty: word.userWord === undefined ? 'easy' : word.userWord.difficulty,
    optional: {
      repeat: word.userWord === undefined ? true : word.userWord.optional.repeat,
      date: Date.now(),
      delete: word.userWord === undefined ? false : word.userWord.optional.delete,
      counter: word.userWord === undefined ? 0 : word.userWord.optional.counter,
      rightWord: word.userWord === undefined ? 0 : word.userWord.optional.rightWord,
      wrongWord: word.userWord === undefined ? 0 : word.userWord.optional.wrongWord,
      word: word.word,
      translation: word.wordTranslate,
    },
  };

  console.log(array);
  const reg1 = '(.*?)<b>';
  const reg2 = '</b>(.*?)+';
  const startSentence = word.textExample.match(reg1);
  const endSentence = word.textExample.match(reg2);

  createCardWord(word.transcription, word.textExampleTranslate,
    word.textMeaningTranslate, getMedia(word.image), word.wordTranslate, word.textMeaning);

  showInformationWord();

  document.querySelector('.progress').max = quantityCards;
  document.querySelector('.progress').value = counterCard;
  document.querySelector('.word-start').innerHTML = `${startSentence[1]}`;
  document.querySelector('.word-end').innerHTML = `${endSentence[0]}`;
  document.querySelector('.input').maxLength = `${word.word.length}`;

  word.word.split('').forEach((element, i) => {
    const litter = document.createElement('span');
    litter.setAttribute('index', `${i}`);
    litter.classList = 'hidden';
    litter.innerText = element;
    document.querySelector('.input-background').append(litter);
  });

  document.querySelector('.input').style.width = `${document.querySelector('.input-background').offsetWidth}px`;
}

export function nextWord() {
  console.log('next');
  document.querySelector('.show-answer').disabled = 'true';
  document.querySelector('.enter').disabled = 'true';

  playAudio(word.audio)
    .then(() => (localStorage.getItem('example') === 'true' ? playAudio(word.audioExample) : false))
    .then(() => (localStorage.getItem('explanation') === 'true' ? playAudio(word.audioMeaning) : false))
    .then(() => {
      document.querySelector('.input-background').style.opacity = 0;
      document.querySelector('.meaning-word i').style.opacity = 0;

      setTimeout(() => {
        if (word.userWord) {
          updateUserWord(tokens, usersId, word._id, objectUserWord).then((q) => console.log(q));
        } else {
          createUserWord(tokens, usersId, word._id, objectUserWord).then((q) => console.log(q));
        }

        if (arrayCommon.length === 0) {
          arrayCorrectAnswer.push(counterSeriesCorrectAnswer);

          const statsValues = {
            trainingAllCards: +(localStorage.getItem('cards')),
            trainingRightCards: counterCorrectAnswer,
            trainingNewCards: +(localStorage.getItem('newWord')),
            trainingCardSeries: Math.max.apply(null, arrayCorrectAnswer),
          };

          document.querySelector('.main-container').innerHTML = '';
          renderFinalPage(statsValues);
        } else {
          document.querySelector('.show-answer').disabled = 'false';
          document.querySelector('.enter').disabled = 'false';

          showCardWord(arrayCommon);
        }
      }, 1000);
    });
}
export function updateWord(event) {
  if (event.target.closest('.delete-word')) {
    objectUserWord.optional.delete = true;
  }
  if (event.target.closest('.wrap-card__button-hard-word')) {
    objectUserWord.difficulty = 'hard';
  }
  if (event.target.closest('.play-audio')) {
    playAudio(word.audio);
  }
  if (event.target.closest('.explanation')) {
    playAudio(word.audioMeaning);
  }
}

async function mainGame() {
  document.querySelector('.main-container').outerHTML = document.querySelector('.main-container').outerHTML;
  quantityNewWords = localStorage.getItem('newWord');
  quantityCards = localStorage.getItem('cards');
  const authorized = JSON.parse(sessionStorage.getItem('authorized'));
  tokens = authorized.token;
  usersId = authorized.userId;
  counterCard = 0;

  upsertUserSettings(tokens, usersId,
    { optional: getAndInitLocalData() });

  if (quantityNewWords === '0') {
    arrayUserWords = await getAllAggregatedWords(tokens, usersId,
      quantityCards, filterUserWord);

    arrayCommon = arrayUserWords[0].paginatedResults.sort(() => Math.random() - 0.5);
  }

  if (quantityCards === quantityNewWords) {
    arrayNewWords = await getAllAggregatedWords(tokens, usersId,
      quantityCards, newWord);

    arrayCommon = arrayNewWords[0].paginatedResults.sort(() => Math.random() - 0.5);
  }

  if (quantityNewWords > 0 && quantityNewWords !== quantityCards) {
    arrayNewWords = await getAllAggregatedWords(tokens, usersId,
      quantityNewWords, newWord);

    arrayUserWords = await getAllAggregatedWords(tokens, usersId,
      quantityCards - quantityNewWords, filterUserWord);

    arrayCommon = arrayNewWords[0].paginatedResults.concat(arrayUserWords[0].paginatedResults)
      .sort(() => Math.random() - 0.5);
  }

  showCardWord(arrayCommon);
}

export function compareWord() {
  results = document.querySelector('.input').value;

  if (results.toLowerCase() === word.word.toLowerCase()) {
    objectUserWord.optional.rightWord += 1;
    objectUserWord.optional.counter += 1;
    objectUserWord.optional.repeat = (objectUserWord.optional.counter < 4);

    document.querySelector('.meaning-word i').style.opacity = 1;
    document.querySelector('.explanation-word').style.opacity = 1;
    document.querySelector('.translate-sentense').style.opacity = 1;

    nextWord();
    if (isCorrectAnswer === true) {
      counterCorrectAnswer += 1;
      counterSeriesCorrectAnswer += 1;
    }
  } else {
    objectUserWord.optional.wrongWord += 1;
    arrayCorrectAnswer.push(counterSeriesCorrectAnswer);
    isCorrectAnswer = false;
    counterSeriesCorrectAnswer = 0;

    document.querySelector('.input').value = '';
    document.querySelector('.input-background').style.opacity = 1;

    setTimeout(() => {
      document.querySelector('.input-background').style.opacity = 0.5;
    }, 500);

    const arrayWord = word.word.split('');
    const arrayResults = results.split('');
    let counterLitter = 0;
    const errorLitter = [];

    for (let i = 0; i < arrayWord.length; i += 1) {
      if (arrayResults[i] !== arrayWord[i]) {
        counterLitter += 1;
        errorLitter.push(document.querySelector(`[index='${i}']`));
      } else {
        document.querySelector(`[index='${i}']`).style.color = 'green';
      }
    }

    errorLitter.forEach((e) => {
      e.style.color = counterLitter > (arrayWord.length / 2) ? 'red' : 'orange';
    });

    playAudio(word.audio);
  }
}

export default mainGame;