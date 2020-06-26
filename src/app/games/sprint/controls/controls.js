/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { getWords } from '../../../common/network/backendWords/backendWords';
// import getMedia from '../../../common/utils/githubMedia';
import getRandomInteger from '../../../common/utils/randomInteger';

export default function springGamePageHandling() {
  const body = document.querySelector('body');
  // const englishWord = document.querySelector('.word');
  // const translation = document.querySelector('.translation');
  // const wordSound = document.querySelector('.sound-button');
  body.classList.add('body__settings-page');

  function shuffle(array) {
    let currentIndex = array.length; let temporaryValue; let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  // async function getWordInfo(group, page) {
  //   const data = await getWords(group, page);
  //   const { word } = data[0];
  //   const { wordTranslate } = data[0];
  //   const { id } = data[0];
  //   const { audio } = data[0];
  //   const media = getMedia(audio);
  //   console.log(word);
  //   console.log(wordTranslate);
  //   console.log(id);
  //   console.log(audio);
  //   console.log(media);
  //   englishWord.innerText = word;
  //   translation.innerText = wordTranslate;
  // }

  async function getArrayOfWords(group, page) {
    const data = await getWords(group, page);
    for (let i = 0; i < data.length; i++) {
      data[i].isAnswerCorrect = true;
    }
    const numberOfIncorrectWords = getRandomInteger(2, 3);
    for (let i = 0; i <= numberOfIncorrectWords + 2;) {
      const first = data[i].wordTranslate;
      const next = data[i + 1].wordTranslate;
      const buffer = first;
      data[i].wordTranslate = `${next}`;
      data[i + 1].wordTranslate = `${buffer}`;
      data[i].isAnswerCorrect = false;
      data[i + 1].isAnswerCorrect = false;
      i += 2;
    }
    // shuffle(data);
    console.log(shuffle(data));
    return data;
  }

  getArrayOfWords(1, 1);
}

// function playAudio(src) {
//   const audioElement = new Audio(src);
//   audioElement.play();
// }
