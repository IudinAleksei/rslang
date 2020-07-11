/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import fetchUrl from '../../common/network/backendWords/commonFetch';
import {
  loginUser, createUser, getAllUserWords, createUserWord,
  updateUserWord, upsertUserSettings, getUserSettings,
} from '../../common/network/backendWords/backendWords';
import getMedia from '../../common/utils/githubMedia';
import { getAndInitLocalData } from '../../common/index';
import createCardWord from '../training/view/cardWithWord';
import showInformationWord from './view/showInformationWord';

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
let progressCardLength;
let objectUserWord;
let counterCard = 0;
const email = 'team52@mail.ru';
const password = 'Test2020+';
const tokens = localStorage.getItem('token');
const usersId = localStorage.getItem('userId');
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

export function nextWord() {
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
          alert();
        } else {
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

getAllUserWords(tokens, usersId).then((q) => {
  console.log(q);
});
upsertUserSettings(tokens, usersId, { optional: getAndInitLocalData() });
getUserSettings(tokens, usersId).then((q) => console.log(q));

export async function showCardWord(array) {
  counterCard += 1;
  document.querySelector('.main-container').innerHTML = '';
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
    },
  };
  console.log(array);
  const reg1 = '(.*?)<b>';
  const reg2 = '</b>(.*?)+';
  const w = word.textExample.match(reg1);
  const e = word.textExample.match(reg2);
  createCardWord(word.transcription, word.textExampleTranslate,
    word.textMeaningTranslate, getMedia(word.image), word.wordTranslate, word.textMeaning);
  showInformationWord();
  document.querySelector('.progress').max = quantityCards;
  console.log(document.querySelector('.progress').max);
  document.querySelector('.progress').value = counterCard;
  document.querySelector('.word-start').innerHTML = `${w[1]}`;
  document.querySelector('.word-end').innerHTML = `${e[0]}`;
  document.querySelector('.input').maxLength = `${word.word.length}`;
  word.word.split('').forEach((element, i) => {
    const litter = document.createElement('span');
    litter.setAttribute('index', `${i}`);
    litter.classList = 'hidden';
    litter.innerText = element;
    document.querySelector('.input-background').append(litter);
  });
  document.querySelector('.input').style.width = `${document.querySelector('.input-background').offsetWidth}px`;
  console.log(document.querySelector('.input-background').offsetWidth);
}

async function mainGame() {
  document.querySelector('.main-container').outerHTML = document.querySelector('.main-container').outerHTML;
  document.querySelector('.main-container').innerHTML = '';
  quantityNewWords = localStorage.getItem('newWord');
  quantityCards = localStorage.getItem('cards');
  console.log(progressCardLength);
  await getAndInitLocalData();
  upsertUserSettings(tokens, usersId, { optional: getAndInitLocalData() });
  getUserSettings(tokens, usersId).then((q) => console.log(q));
  await loginUser({ email: `${email}`, password: `${password}` }).then((q) => {
    console.log(q);
    localStorage.setItem('token', q.token);
    localStorage.setItem('userId', q.userId);
  });
  arrayUserWords = await getAllAggregatedWords(tokens, usersId,
    quantityCards - quantityNewWords, filterUserWord);
  arrayNewWords = await getAllAggregatedWords(tokens, usersId,
    quantityNewWords, newWord);
  arrayCommon = arrayNewWords[0].paginatedResults.concat(arrayUserWords[0].paginatedResults)
    .sort(() => Math.random() - 0.5);
  showCardWord(arrayCommon);
  console.log(arrayNewWords, arrayUserWords, arrayCommon);
}

export function compareWord() {
  results = document.querySelector('.input').value;
  if (results.toLowerCase() === word.word.toLowerCase()) {
    objectUserWord.optional.repeat = ((objectUserWord.optional.repeat < 6));
    objectUserWord.optional.counter += 1;
    console.log(objectUserWord);
    document.querySelector('.meaning-word i').style.opacity = 1;
    document.querySelector('.explanation-word').style.opacity = 1;
    document.querySelector('.translate-sentense').style.opacity = 1;
    nextWord();
  } else {
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
