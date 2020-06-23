import { API_KEYS, API_REQUEST } from '../constants';
import basicFetch from './basicFetch';

export const translateEngToRus = async (word, key = 'yandexTranslation') => {
  const url = `${API_REQUEST.yandexTranslation}key=${API_KEYS[key]}&text=${word}&lang=en-ru`;

  const yandexResponse = await basicFetch(url);

  const translate = yandexResponse ? yandexResponse.text[0] : null;

  return translate;
};

export const translateRusToEng = async (word, key = 'yandexTranslation') => {
  const url = `${API_REQUEST.yandexTranslation}key=${API_KEYS[key]}&text=${word}&lang=ru-en`;

  const yandexResponse = await basicFetch(url);

  const translate = yandexResponse ? yandexResponse.text[0] : null;

  return translate;
};
