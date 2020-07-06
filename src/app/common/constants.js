export const DEFAULT_SESSION_DATA = Object.freeze({
  score: 0,
});

export const DEFAULT_LOCAL_DATA = Object.freeze({
  puzzleAutoPlaySound: 'true',
  puzzleShowImage: 'true',
  puzzleShowTranslation: 'true',
  puzzleRepeatPlay: 'true',
  puzzleLevel: 0,
  puzzlePage: 0,
  showAnswer: 'true',
  deleteWord: 'true',
  hardWord: 'true',
  transcription: 'true',
  example: 'true',
  translation: 'true',
  sentencesTranslation: 'true',
  showPicture: 'true',
  explanation: 'true',
  playAudio: 'true',
});

export const API_KEYS = Object.freeze({
  yandexTranslation: 'trnsl.1.1.20200421T084156Z.8eb8c0246fffb61e.780bc9f73b105718a88f1ccd7658c5b3005b7921',
});

export const API_REQUEST = Object.freeze({
  yandexTranslation: 'https://translate.yandex.net/api/v1.5/tr.json/translate?',
});

export const ELEMENTS_CLASSES = Object.freeze({
  headerContainer: 'header-container',
  hideHeaderContainer: 'header-container_hidden',
  main: 'main',
  hideMain: 'main_hidden',
  mainContainer: 'main-container',
});
