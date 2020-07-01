import fetchUrl from './commonFetch';

export async function getWords(group, page) {
  const urlWords = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
  const content = fetchUrl(urlWords, {});
  return content;
}

export async function getCountWords(group, wordsPerExampleSentence, wordsPerPage) {
  const urlWords = `https://afternoon-falls-25894.herokuapp.com/words/count?group=${group}&wordsPerExampleSentenceLTE=${wordsPerExampleSentence}&wordsPerPage=${wordsPerPage}`;
  const content = fetchUrl(urlWords, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  return content;
}

export async function getWordById(wordId) {
  const urlWords = `https://afternoon-falls-25894.herokuapp.com/words/${wordId}`;
  const content = fetchUrl(urlWords, {});
  return content;
}
