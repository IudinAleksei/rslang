import getRandomInteger from '../../../common/utils/randomInteger';

export function shuffle(array) {
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

export function playAudio(src) {
  const audioElement = new Audio(src);
  audioElement.play();
}

export function mixTranslations(words) {
  const shuffledArray = shuffle(words);
  for (let i = 0; i < shuffledArray.length; i += 1) {
    shuffledArray[i].isAnswerCorrect = true;
  }
  const numberOfIncorrectWords = getRandomInteger(2, 3);
  for (let i = 0; i <= numberOfIncorrectWords + 2;) {
    const first = shuffledArray[i].wordTranslate;
    const next = shuffledArray[i + 1].wordTranslate;
    const buffer = first;
    shuffledArray[i].wordTranslate = next;
    shuffledArray[i + 1].wordTranslate = buffer;
    shuffledArray[i].isAnswerCorrect = false;
    shuffledArray[i + 1].isAnswerCorrect = false;
    i += 2;
  }
  return shuffle(shuffledArray);
}
