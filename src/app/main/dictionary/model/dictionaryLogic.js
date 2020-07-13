import {
  getAllUserWords,
  getWordById,
  updateUserWord,
} from '../../../common/index';

let authData = {};

export const readAllUserWords = async (loginResponse) => {
  authData = loginResponse;
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

export const findByWordId = (userWords, wordId) => {
  const wordObject = userWords.find((word) => word.userWord.wordId === wordId);
  return wordObject.userWord;
};

export const setWordEasy = (word) => {
  const tempWordObject = {
    difficulty: 'easy',
    optional: word.optional,
  };

  updateUserWord(authData.token, authData.userId, word.wordId, tempWordObject);
};

export const undeleteWord = async (word) => {
  const tempWordObject = {
    difficulty: word.difficulty,
    optional: word.optional,
  };

  tempWordObject.optional.delete = false;

  updateUserWord(authData.token, authData.userId, word.wordId, tempWordObject);
};
