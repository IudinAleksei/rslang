/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import {
  getWordsInfo, getWordInfoById, getWords, getRandomInteger,
} from '../../../common/index';

let round = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function getWord() {
  const wordsArr = await getWords(0, getRandomInteger(0, 29));
  const word = wordsArr[getRandomInteger(0, wordsArr.length - 1)];
  return word;
}

export default async function getWordArr() {
  const {
    word, wordTranslate, audio, image,
  } = await getWord();
  const wordInfo = await getWordsInfo(word);
  const { id } = wordInfo[0].meanings[0];
  const [wordObj] = await getWordInfoById(id);

  const arr = wordObj.alternativeTranslations;
  const newArr = [];
  arr.map((el) => newArr.push(el.translation.text));
  const sliceArr = newArr.slice(0, 4);
  sliceArr.push(wordTranslate);
  shuffle(sliceArr);

  const ol = document.createElement('ol');
  ol.classList.add('word-list');

  for (let i = 0; i < 5; i += 1) {
    const li = document.createElement('li');
    li.classList.add('word-list__item');
    li.innerText = sliceArr[i];

    if (sliceArr[i] === wordTranslate) {
      li.setAttribute('data-word', word);
      li.setAttribute('data-audio', audio);
      li.setAttribute('data-image', image);
    }

    ol.append(li);
  }

  document.querySelector('.audiochallenge-list').innerHTML = '';
  document.querySelector('.audiochallenge-list').append(ol);

  if (round === 10) {
    round = 0;
  }

  round += 1;
}
