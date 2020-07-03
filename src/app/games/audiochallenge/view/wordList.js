/* eslint-disable no-param-reassign */
import {
  getWordsInfo, getWordInfoById, getWords, getRandomInteger,
} from '../../../common/index';

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function getWord(level = 0) {
  const wordsArr = await getWords(level, getRandomInteger(0, 29));
  const word = wordsArr[getRandomInteger(0, wordsArr.length - 1)];
  return word;
}

export default async function getWordArr(level) {
  const {
    word, wordTranslate, audio, image,
  } = await getWord(level);
  const wordInfo = await getWordsInfo(word);
  const { id } = wordInfo[0].meanings[0];
  const [wordObj] = await getWordInfoById(id);

  const arr = wordObj.alternativeTranslations;
  const filterArr = arr.filter((el) => !(/\s+/).test(el.translation.text));

  const newArr = [];
  filterArr.map((el) => newArr.push(el.translation.text));
  const sliceArr = newArr.slice(0, 4);
  sliceArr.push(wordTranslate);
  shuffle(sliceArr);

  const ol = document.createElement('ol');
  ol.classList.add('word-list');

  for (let i = 0; i < 5; i += 1) {
    const li = document.createElement('li');
    li.classList.add('word-list__item');
    li.innerText = sliceArr[i];
    li.setAttribute('data-key', i + 1);

    if (sliceArr[i] === wordTranslate) {
      li.setAttribute('data-word', word);
      li.setAttribute('data-audio', audio);
      li.setAttribute('data-image', image);
    }

    ol.append(li);
  }

  document.querySelector('.audiochallenge-list').innerHTML = '';
  document.querySelector('.audiochallenge-list').append(ol);
}
