export async function getWordsInfo(word) {
  const url = `https://dictionary.skyeng.ru/api/public/v1/words/search?search=${word}`;

  const response = await fetch(url);
  const res = await response.json();

  return res;
}

export async function getWordInfoById(id) {
  const url = `https://dictionary.skyeng.ru/api/public/v1/meanings?ids=${id}`;

  const response = await fetch(url);
  const res = await response.json();

  return res;
}
