import { getWords } from '../../../common/index';

function random(min = 0, max = 19) {
  Math.ceil(min);
  Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default async function createWordList() {
  const wordsArr = await getWords(1, random(0, 30));
  const wordListWrapper = document.createElement('div');
  wordListWrapper.classList.add('word-list__wrapper');
  const ul = document.createElement('ul');
  ul.classList.add('words-list');

  for (let i = 0; i < 5; i += 1) {
    const word = wordsArr[random()];
    const li = document.createElement('li');
    li.innerText = word.word;
    li.setAttribute('id', word.id);
    ul.append(li);
  }

  return document.querySelector('body').append(ul);
}
