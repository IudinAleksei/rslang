import { fetchUrl } from './commonFetch';

export async function getUserStatistic(token, userId) {
  const urlWords = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`;
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

export async function upsertUserStatistic(token, userId, learnedWords) {
  const urlWords = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`;
  const content = fetchUrl(urlWords, {
    method: 'PUT',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(learnedWords)
  });
  return content;

}