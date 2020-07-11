import { getAllAggregatedWords, getWords, getRandomInteger } from '../../../common/index';

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

export default async function getWordsArray(loginResponse, level) {
  const { token, userId } = loginResponse;

  const filter = { $and: [{ 'userWord.difficulty': 'easy', 'userWord.optional.repeat': true, 'userWord.optional.delete': false }] };

  let backendWordArr = [];

  const userWord = [];

  const AggregatedUserWord = await getAllAggregatedWords(token, userId, filter);

  if (level === false && AggregatedUserWord[0].paginatedResults.length) {
    const allUserWordsCount = AggregatedUserWord[0].totalCount[0].count;

    const allUserWord = await getAllAggregatedWords(token, userId, filter, null, allUserWordsCount);

    if (allUserWord[0].paginatedResults.length > 5) {
      allUserWord[0].paginatedResults.map((el) => userWord
        .push({ [el.word]: el.wordTranslate }));
    }
  } else if (level <= 6) {
    backendWordArr = await getWords(level - 1, getRandomInteger(0, 29));
    backendWordArr.map((el) => userWord.push({ [el.word]: el.wordTranslate }));
  }

  shuffle(userWord);

  return userWord;
}
