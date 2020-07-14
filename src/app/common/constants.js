export const DEFAULT_SESSION_DATA = Object.freeze({
  score: 0,
  authorized: {},
});

export const DEFAULT_LOCAL_DATA = Object.freeze({
  puzzleAutoPlaySound: 'true',
  puzzleShowImage: 'true',
  puzzleShowTranslation: 'true',
  puzzleRepeatPlay: 'true',
  puzzleLevel: 0,
  puzzlePage: 0,
  audiochallengeLevel: 1,
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
  newWord: 10,
  cards: 20,
  savannahLevel: 1,
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
  trainingFinalPage: 'training-final-container',
  hideTrainingFinalPage: 'training-final-container_hidden',
  trainingFinalMessage: 'training-final-page',
  trainingFinalTitle: 'training-final-page__title',
  trainingFinalText: 'training-final-page__text',
  trainingShortStatsTitle: 'training-final-page__short-stats__title',
  trainingShortStatsBtn: 'training-final-page__short-stats-button',
  trainingShortStatsString: 'training-final-page__short-stats__string',
  trainingShortStatsDescription: 'training-final-page__short-stats__string__description',
  trainingShortStatsValue: 'training-final-page__short-stats__string__value',
  dictionary: 'dictionary',
  dictionaryBody: 'dictionary-body',
  dictionaryBtnContainer: 'dictionary__button-container',
  dictionaryBtn: 'dictionary__tab-button',
  dictionaryTableContainer: 'dictionary__table-container',
  dictionaryTable: 'dictionary__table',
  dictionaryTableRow: 'dictionary__table__row',
  dictionaryRowWord: 'dictionary__table__row__word',
  dictionaryRowImage: 'dictionary__table__row__image',
  dictionaryRowTextContainer: 'dictionary__table__row__text-container',
  dictionaryRowSentence: 'dictionary__table__row__text-container__sentence',
  dictionaryHideTableRow: 'dictionary__table__row_hidden',
  selectDictionaryBtn: 'dictionary__tab-button_selected',
  dictionaryPlayBtn: 'dictionary__play-button',
  dictionaryRecoveryBtn: 'dictionary__recovery-button',
  dictionaryWordIndicator: 'dictionary__row__indicator',
});

export const MESSAGES = Object.freeze({
  trainingFinalTitle: 'RSLang Training Mode',
  trainingFinalText: 'You have reached your daily card limit. \n You can increase the daily limit, but this may reduce the effectiveness of memorizing words.',
  trainingShortStatsBtn: 'Show short-term stats',
  trainingStatsTitle: 'Short-term statistics of this training session',
  trainingAllCards: 'Total cards',
  trainingRightCards: 'Correct answer',
  trainingNewCards: 'New words',
  trainingCardSeries: 'The longest series of correct answers',
  dictionaryRepetitions: 'repeat: ',
  dictionaryLastDate: 'last: ',
  dictionaryNextDate: 'next: ',
  dictionaryNextDateNearest: 'soon',
});

export const INTERVALS = Object.freeze({
  total: 5,
  1: 120,
  2: 600,
  3: 3600,
  4: 18000,
});
