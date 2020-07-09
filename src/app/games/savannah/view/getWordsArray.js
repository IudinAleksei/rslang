import { getAllUserWords, getWords, getRandomInteger } from '../../../common/index';

export default async function getWordsArray(loginResponse, level) {
  const { token, userId } = loginResponse;

  let backendWordArr = [];

  if (level <= 6) {
    backendWordArr = await getWords(level - 1, getRandomInteger(0, 29));
  }

  const allUserWord = await getAllUserWords(token, userId);

  const userWord = [];

  if (allUserWord.length > 5 && level === false) {
    allUserWord.map((el) => userWord.push({ [el.optional.word]: el.optional.wordTranslate }));
  } else {
    backendWordArr.map((el) => userWord.push({ [el.word]: el.wordTranslate }));
  }

  return userWord;
}
