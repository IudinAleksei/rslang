export { default as getMedia } from './utils/githubMedia';

export {
  getWords, getCountWords, getWordById, createUser, loginUser, deleteUser,
  createUserWord, getAllUserWords, getUserWordById, deleteUserWordById, updateUserWord,
  getUserStatistic, upsertUserStatistic, getUserSettings, upsertUserSettings,
} from './network/backendWords/backendWords';

export { setSessionData, getSessionData, getAndInitSessionData } from './utils/sessionStorage';

export { wordInfo, partOfSpeech } from './network/wordsApi/apiWords';

export { translateEngToRus, translateRusToEng } from './network/translationAPI';
