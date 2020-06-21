/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { getWordsInfo, getWordInfoById } from '../../../common/index';

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function getWordArr() {
  const wordData = document.querySelector('.word-audio').dataset.word;
  const wordTranslate = document.querySelector('.word-audio').dataset.translate;
  const wordInfo = await getWordsInfo(wordData);
  const ids = wordInfo[0].meanings[0].id;
  const infoId = await getWordInfoById(ids);

  const arr = infoId[0].alternativeTranslations;
  const newArr = [];
  arr.map((el) => newArr.push(el.translation.text));
  const sliceArr = newArr.slice(0, 4);
  sliceArr.push(wordTranslate);
  shuffle(sliceArr);

  const ul = document.createElement('ul');

  for (let i = 0; i < 5; i += 1) {
    const li = document.createElement('li');
    li.innerText = sliceArr[i];
    ul.append(li);
  }

  document.querySelector('.main-container').append(ul);
}

async function createWordList() {
  getWordArr();
}

export { createWordList, getWordArr };
