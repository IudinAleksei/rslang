import { getAllUserWords, getWordById } from '../../../common/index';

export const readAllUserWords = async (loginResponse) => {
  const userWords = await getAllUserWords(loginResponse.token, loginResponse.userId);
  const idWordArray = userWords.map((word) => word.wordId);
  const wordRequestArray = await Promise.all(idWordArray.map((id) => getWordById(id)));

  const resultArray = userWords.map((word, index) => {
    const resultWord = {
      userWord: word,
      wordData: wordRequestArray[index],
    };

    return resultWord;
  });

  return resultArray;
};

export const getDifficultUserWords = (userWords) => {
  const result = userWords.filter((word) => word.userWord.difficulty === 'hard');
  return result;
};

export const getDeletedUserWords = (userWords) => {
  const result = userWords.filter((word) => word.userWord.optional.delete);
  return result;
};
