/* eslint-disable padded-blocks */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable comma-dangle */
/* eslint-disable quote-props */
import { fetchUrl } from './commonFetch';

export async function getAllUserWords(token, userId) {
  const urlWords = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`;
  const content = fetchUrl(urlWords, {
    method: 'GET',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  return content;
}


export async function createUserWord(token, userId, wordId, word) {
  const urlWords = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`;
  const content = fetchUrl(urlWords, {
    method: 'POST',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  });
  return content;
}


export async function updateUserWord(token, userId, wordId, word) {
  const urlWords = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`;
  const content = fetchUrl(urlWords, {
    method: 'PUT',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  });
  return content;
}

export async function getUserWordById(token, userId, wordId) {
  const urlWords = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`;
  const content = fetchUrl(urlWords, {
    method: 'GET',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'accept': 'application/json',
    }
  });
  return content;

}

export async function deleteUserWordById(token, userId, wordId) {
  const urlWords = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`;
  const content = fetchUrl(urlWords, {
    method: 'DELETE',
    withCredentials: true,
    headers: {
      'accept': '*/*',
      'Authorization': `Bearer ${token}`,
    }
  });
  return content;

}
