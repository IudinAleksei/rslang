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

function showInformationWord() {
  if (localStorage.getItem('showAnswer') === 'true') {
    document.querySelector('.show-answer').style.display = 'block';
  } else {
    document.querySelector('.show-answer').style.display = 'none';
  }
  if (localStorage.getItem('deleteWord') === 'true') {
    document.querySelector('.delete-word').style.display = 'block';
  } else {
    document.querySelector('.delete-word').style.display = 'none';
  }
  if (localStorage.getItem('playAudio') === 'true') {
    document.querySelector('.play-audio').style.display = 'block';
  } else {
    document.querySelector('.play-audio').style.display = 'none';
  }
  if (localStorage.getItem('hardWord') === 'true') {
    document.querySelector('.wrap-card__button-hard-word').style.display = 'block';
  } else {
    document.querySelector('.wrap-card__button-hard-word').style.display = 'none';
  }
  if (localStorage.getItem('transcription') === 'true') {
    document.querySelector('.transcript').style.display = 'block';
  } else {
    document.querySelector('.transcript').style.display = 'none';
  }
  if (localStorage.getItem('example') === 'true') {
    document.querySelector('.word-start').style.display = 'inline-block';
    document.querySelector('.word-end').style.display = 'inline-block';
    document.querySelector('.translate-sentense').style.display = 'block';
  } else {
    document.querySelector('.word-start').style.display = 'none';
    document.querySelector('.word-end').style.display = 'none';
    document.querySelector('.translate-sentense').style.display = 'none';
  }
  if (localStorage.getItem('showPicture') === 'true') {
    document.querySelector('.image').style.display = 'block';
  } else {
    document.querySelector('.image').style.display = 'none';
  } if (localStorage.getItem('explanation') === 'true') {
    document.querySelector('.meaning-word').style.display = 'block';
    document.querySelector('.explanation-word').style.display = 'block';
    document.querySelector('.explanation').style.display = 'block';
  } else {
    document.querySelector('.meaning-word').style.display = 'none';
    document.querySelector('.explanation-word').style.display = 'none';
    document.querySelector('.explanation').style.display = 'none';
  }
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
        showCardWord(arrayCommon);
      }, 1000);
    });
}
export function updateWord(event) {
  if (event.target.className === 'delete-word') {
    objectUserWord.optional.delete = true;
    console.log(objectUserWord);
  }
  if (event.target.className === 'wrap-card__button-hard-word') {
    objectUserWord.difficulty = 'hard';
    console.log(objectUserWord);
  }
  if (event.target.className === 'play-audio') {
    console.log(event.target);
    playAudio(word.audio);
  }
  if (event.target.className === 'explanation') {
    playAudio(word.audioMeaning);
  }
}

let word;
let results;
let arrayNewWords;
let arrayUserWords;
let arrayCommon;
let progressCardLength;
let objectUserWord;
const email = 'team52@mail.ru';
const password = 'Test2020+';
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
upsertUserSettings(tokens, usersId, { optional: getAndInitLocalData() });
getUserSettings(tokens, usersId).then((q) => console.log(q));

export async function showCardWord(array) {
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
  console.log(word.word.length * 8);
  createCardWord(word.transcription, word.textExampleTranslate,
    word.textMeaningTranslate, getMedia(word.image), word.wordTranslate, word.textMeaning);
  showInformationWord();
  document.querySelector('.progress').max = progressCardLength;
  console.log(document.querySelector('.progress').max);
  document.querySelector('.progress').value = `${document.querySelector('.progress').max - array.length}`;
  document.querySelector('.word-start').innerHTML = `${w[1]}`;
  document.querySelector('.word-end').innerHTML = `${e[0]}`;
  document.querySelector('.input').maxLength = `${word.word.length}`;
  /*  document.querySelector('.image-word').setAttribute('src', getMedia(word.image));
  document.querySelector('.word-translate').innerHTML = `${word.wordTranslate}`;
  document.querySelector('.show-word').innerHTML = word.textExampleTranslate;
  document.querySelector('.text-meaning').innerHTML = word.textMeaning;
  document.querySelector('.text-meaning-translate').innerHTML = word.textMeaningTranslate;
  document.querySelector('.word-transcription').innerHTML = word.transcription;
  document.querySelector('.write-word').maxLength = `${word.word.length}`;
  document.querySelector('.input-background').innerHTML = ''; */
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

async function mainGame(sliderCounterNewWords, sliderCounterCards) {
  progressCardLength = sliderCounterCards.textContent;
  document.querySelector('.main-container').outerHTML = document.querySelector('.main-container').outerHTML;
  document.querySelector('.main-container').innerHTML = '';
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
    sliderCounterCards.textContent - sliderCounterNewWords.textContent, filterUserWord);
  arrayNewWords = await getAllAggregatedWords(tokens, usersId,
    sliderCounterNewWords.textContent, newWord);
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
    /*  if (word.userWord) {
      objectUserWord = {
        difficulty: 'easy',
        optional: {
          repeat: ((word.userWord.optional.counter < 6)),
          date: Date.now(),
          delete: false,
          counter: word.userWord.optional.counter += 1,
        },
      };
    } else {
      objectUserWord = {
        difficulty: 'easy',
        optional: {
          repeat: true,
          date: Date.now(),
          delete: false,
          counter: 0,
        },
      };
    } */
    document.querySelector('.meaning-word i').style.opacity = 1;
    nextWord();
  } else {
    document.querySelector('.input').value = '';
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
    /*   if (word.userWord) {
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
    } */
    playAudio(word.audio);
  }
}

export default mainGame;
