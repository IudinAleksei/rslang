import fetchUrl from './commonFetch';

export async function getUserSettings(token, userId) {
  const urlWords = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`;
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

export async function upsertUserSettings(token, userId, settingsUser) {
  const urlWords = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`;
  const content = fetchUrl(urlWords, {
    method: 'PUT',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settingsUser),
  });
  return content;
}
