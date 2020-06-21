import fetchUrl from '../backendWords/commonFetch';

export async function getWordsInfo(word) {
  const url = `https://dictionary.skyeng.ru/api/public/v1/words/search?search=${word}`;

  const res = await fetchUrl(url);

  return res;
}

export async function getWordInfoById(id) {
  const url = `https://dictionary.skyeng.ru/api/public/v1/meanings?ids=${id}`;

  const res = await fetchUrl(url);

  return res;
}
