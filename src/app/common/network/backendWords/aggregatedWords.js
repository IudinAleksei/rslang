import fetchUrl from './commonFetch';

export async function getAllAggregatedWords(token, userId, filter,
  group = null, wordsPerPage = null) {
  let urlWords = '';
  if (group === null && wordsPerPage === null) {
    urlWords = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords?filter=${encodeURIComponent(JSON.stringify(filter))}`;
  } else if (wordsPerPage === null) {
    urlWords = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords?group=${group}&filter=${encodeURIComponent(JSON.stringify(filter))}`;
  } else if (group === null) {
    urlWords = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords?wordsPerPage=${wordsPerPage}&filter=${encodeURIComponent(JSON.stringify(filter))}`;
  } else {
    urlWords = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords?group=${group}&wordsPerPage=${wordsPerPage}&filter=${encodeURIComponent(JSON.stringify(filter))}`;
  }
  const content = fetchUrl(urlWords, {
    method: 'GET',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    },
  });
  return content;
}

export async function getAggregatedWordsById(token, userId, wordId) {
  const urlWords = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords/${wordId}`;
  const content = fetchUrl(urlWords, {
    method: 'GET',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  return content;
}
