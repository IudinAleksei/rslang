import {
  getWordsInfo, getWordInfoById,
} from '../../../common/index';

function shuffle(array) {
  const shuffledArray = array;
  let currentIndex = shuffledArray.length;
  let temporaryValue;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    shuffledArray[currentIndex] = array[randomIndex];
    shuffledArray[randomIndex] = temporaryValue;
  }
  return shuffledArray;
}

const audioChallengeArray = [];

export async function getWord(array) {
  audioChallengeArray.splice(0);
  audioChallengeArray.push(...array);
}

export async function getWordArr() {
  const audiochallengeGameWord = audioChallengeArray[0];
  audioChallengeArray.splice(0, 1);

  const {
    word, wordTranslate, audio, image,
  } = audiochallengeGameWord;

  const wordInfo = await getWordsInfo(word);

  const searchRightWord = wordInfo.filter((el) => el.text === word);

  let id = '';

  if (searchRightWord.length === 0) {
    id = wordInfo[0].meanings[0].id;
  } else {
    const searchRightTranslate = searchRightWord[0].meanings
      .filter((el) => el.translation.text === wordTranslate);
    if (searchRightTranslate.length === 0) {
      id = searchRightWord[0].meanings[0].id;
    } else {
      id = searchRightTranslate[0].id;
    }
  }

  const [wordObj] = await getWordInfoById(id);

  const arr = wordObj.alternativeTranslations;
  const filterArr = arr.filter((el) => !(/\s+/).test(el.translation.text.trim()) && (/^[а-я]/).test(el.translation.text.trim()));

  const newArr = [];
  filterArr.map((el) => newArr.push(el.translation.text));
  shuffle(newArr);

  const sliceArr = newArr.slice(0, 4);
  sliceArr.push(wordTranslate);
  shuffle(sliceArr);

  const ol = document.createElement('ol');
  ol.classList.add('audiochallenge__word-list');

  for (let i = 0; i < 5; i += 1) {
    const li = document.createElement('li');
    li.classList.add('audiochallenge__word-list__item');
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
