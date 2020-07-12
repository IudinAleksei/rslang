/* eslint-disable no-unused-vars */
import { getAllUserWords, getWordById, getWords } from '../../../common/index';

export const readAllUserWords = async (loginResponse) => {
  const userWords = await getAllUserWords(loginResponse.token, loginResponse.userId);
  const idWordArray = userWords.map((word) => word.wordId);
  const wordRequestArray = await Promise.all(idWordArray.map((id) => getWordById(id)));

  return wordRequestArray;
};

export const getDifficultUserWords = () => {

};

export const getDeletedUserWords = () => {

};
