/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import fetchUrl from '../../common/network/backendWords/commonFetch';
import {
  loginUser, getAllUserWords, createUserWord, updateUserWord,
} from '../../common/network/backendWords/backendWords';
import getMedia from '../../common/utils/githubMedia';
import showCard from './view/card';
import { getAndInitLocalData } from '../../common/index';

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
    .then(() => {
      document.querySelector('.input-background').style.opacity = 0;
      setTimeout(() => { showCardWord(); }, 1000);
    });
}

let word;
let results;
let arrayNewWords;
let arrayUserWords;
let arrayCommon;
const email = 'boronenkov_s@mail.ru';
const password = 'Boss1985+';
const tokens = localStorage.getItem('token');
const usersId = localStorage.getItem('userId');
const newWord = {
  $or: [
    { userWord: null },
  ],
};
const filterUserWord = { $and: [{ 'userWord.difficulty': 'easy', 'userWord.optional.repeat': true }] };

getAllUserWords(tokens, usersId).then((q) => {
  console.log(q);
});

export async function showCardWord() {
  console.log(arrayNewWords);
  document.querySelector('.write-word').value = '';
  word = arrayNewWords[0].paginatedResults.shift();
  console.log(arrayNewWords);
  console.log(word);
  const reg1 = '(.*?)<b>';
  const reg2 = '</b>(.*?)+';
  const w = word.textExample.match(reg1);
  const e = word.textExample.match(reg2);
  console.log(word.word.length * 8);
  document.querySelector('.image-word').setAttribute('src', getMedia(word.image));
  document.querySelector('.word-translate').innerHTML = `${word.wordTranslate}`;
  document.querySelector('.word-start').innerHTML = `${w[1]}`;
  document.querySelector('.word-end').innerHTML = `${e[0]}`;
  document.querySelector('.show-word').innerHTML = word.textExampleTranslate;
  document.querySelector('.text-meaning').innerHTML = word.textMeaning;
  document.querySelector('.text-meaning-translate').innerHTML = word.textMeaningTranslate;
  document.querySelector('.word-transcription').innerHTML = word.transcription;
  document.querySelector('.write-word').maxLength = `${word.word.length}`;
  document.querySelector('.input-background').innerHTML = '';
  word.word.split('').forEach((element, i) => {
    const litter = document.createElement('span');
    litter.setAttribute('index', `${i}`);
    litter.classList = 'hidden';
    litter.innerText = element;
    document.querySelector('.input-background').append(litter);
  });
  document.querySelector('.write-word').style.width = `${document.querySelector('.input-background').offsetWidth}px`;
  console.log(document.querySelector('.input-background').offsetWidth);
}

async function mainGame(sliderCounterNewWords, sliderCounterCards) {
  console.log(sliderCounterCards.textContent - sliderCounterNewWords.textContent);
  await getAndInitLocalData();
  await loginUser({ email: `${email}`, password: `${password}` }).then((q) => {
    console.log(q);
    localStorage.setItem('token', q.token);
    localStorage.setItem('userId', q.userId);
  });
  arrayUserWords = await getAllAggregatedWords(tokens, usersId,
    sliderCounterCards.textContent - sliderCounterNewWords.textContent, filterUserWord);
  arrayNewWords = await getAllAggregatedWords(tokens, usersId,
    sliderCounterNewWords.textContent, newWord);
  arrayCommon = arrayNewWords[0].paginatedResults.concat(arrayUserWords[0].paginatedResults);
  showCard();
  showCardWord();
  console.log(arrayNewWords[0].paginatedResults, arrayUserWords[0].paginatedResults, arrayCommon);
}

export function compareWord() {
  results = document.querySelector('.write-word').value;
  if (results.toLowerCase() === word.word.toLowerCase()) {
    if (word.userWord) {
      updateUserWord(tokens, usersId, word._id, {
        difficulty: 'easy',
        optional: {
          repeat: ((word.userWord.optional.counter < 6)),
          date: Date.now(),
          delete: true,
          counter: word.userWord.optional.counter += 1,
        },
      });
    } else {
      createUserWord(tokens, usersId, word._id, {
        difficulty: 'easy',
        optional: {
          repeat: true,
          date: Date.now(),
          delete: true,
          counter: 0,
        },
      });
    }

    nextWord();
  } else {
    document.querySelector('.write-word').value = '';
    document.querySelector('.input-background').style.opacity = 1;
    setTimeout(() => {
      document.querySelector('.input-background').style.opacity = 0.5;
    }, 500);
    const arrayWord = word.word.split('');
    const arrayResults = results.split('');
    console.log(arrayWord);
    console.log(arrayResults);
    for (let i = 0; i < arrayWord.length; i += 1) {
      if (arrayResults[i] !== arrayWord[i]) {
        console.log(document.querySelectorAll(`[index='${i}']`));
        document.querySelector(`[index='${i}']`).style.color = 'red';
      } else {
        document.querySelector(`[index='${i}']`).style.color = 'green';
      }
    }
    if (word.userWord) {
      updateUserWord(tokens, usersId, word._id, {
        difficulty: 'easy',
        optional: {
          repeat: ((word.userWord.optional.counter < 6)),
          date: Date.now(),
          delete: true,
          counter: word.userWord.optional.counter += 1,
        },
      });
    } else {
      createUserWord(tokens, usersId, word._id, {
        difficulty: 'easy',
        optional: {
          repeat: true,
          date: Date.now(),
          delete: true,
          counter: 0,
        },
      });
    }
    playAudio(word.audio);
  }
}

export default mainGame;
