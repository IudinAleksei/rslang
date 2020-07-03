/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */

import fetchUrl from '../../common/network/backendWords/commonFetch';
import {
  loginUser, getAllUserWords, createUserWord,
} from '../../common/network/backendWords/backendWords';

export async function getAllAggregatedWords(token, userId, wordsPerPage, filter) {
  const urlWords = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords?wordsPerPage=${wordsPerPage}&filter=${encodeURIComponent(JSON.stringify(filter))}`;
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

async function mainGame() {
  return false;
}

export default mainGame;
