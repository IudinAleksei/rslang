import { fetchUrl } from './commonFetch';

export async function createUser(user) {
  const urlWords = `https://afternoon-falls-25894.herokuapp.com/users`;
  const content = fetchUrl(urlWords, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  return content;
}

export async function loginUser(user) {
  const urlWords = `https://afternoon-falls-25894.herokuapp.com/signin`;
  const content = fetchUrl(urlWords, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  return content;
}

export async function updateUser(token, userId, user) {
  const urlWords = `https://afternoon-falls-25894.herokuapp.com/users/${userId}`;
  const content = fetchUrl(urlWords, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  return content;
}


export async function deleteUser(token, userId) {
  const urlWords = `https://afternoon-falls-25894.herokuapp.com/users//${userId}`;
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