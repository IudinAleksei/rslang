// export {getWords,  getCountWords, getWordById } from './settingsBackend';

export async function getWords(group, page) {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`);
  const content = await rawResponse.json();
  return content;
}

export async function getCountWords(group, wordsPerExampleSentence, words) {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/words/count?group=${group}&wordsPerExampleSentenceLTE=${wordsPerExampleSentence}&wordsPerPage=${words}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });
  const content = await rawResponse.json();
  return content;
}

export async function getWordById(wordId) {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/words/${wordId}`);
  const content = await rawResponse.json();
  return content;
}

export async function createUser(user) {
  const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const content = await rawResponse.json();
  return content;
}

export async function loginUser(user) {
  const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const content = await rawResponse.json();
  return content;
}

export async function updateUser(token, userId, user) {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const content = await rawResponse.json();
  return content;
}


export async function deleteUser(token, userId) {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users//${userId}`, {
    method: 'DELETE',
    withCredentials: true,
    headers: {
      'accept': '*/*',
      'Authorization': `Bearer ${token}`,
    }
  });

  return rawResponse;
}


export async function getAllUserWords(token, userId) {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const content = await rawResponse.json();
  return content;
}


export async function createUserWord(token, userId, wordId, word) {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
    method: 'POST',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  });
  const content = await rawResponse.json();
  return content;
}


export async function updateUserWord(token, userId, wordId, word) {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
    method: 'PUT',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  });
  const content = await rawResponse.json();
  return content;
}

// выдает объект, если ова нету то 401
export async function getUserWordById(token, userId, wordId) {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'accept': 'application/json',
    }
  });
  const content = await rawResponse.json();

  return content;

}

export async function deleteUserWordById(token, userId, wordId) {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
    method: 'DELETE',
    withCredentials: true,
    headers: {
      'accept': '*/*',
      'Authorization': `Bearer ${token}`,
    }
  });

  return rawResponse;

}

export async function getUserStatistic(token, userId) {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'accept': 'application/json',
    }
  });
  const content = await rawResponse.json();

  return content;

}

export async function upsertUserStatistic(token, userId, learnedWords) {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`, {
    method: 'PUT',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(learnedWords)
  });
  const content = await rawResponse.json();

  return content;

}

export async function getUserSettings(token, userId) {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'accept': 'application/json',
    }
  });
  const content = await rawResponse.json();

  return content;

}

export async function upsertUserSettings(token, userId, settingsUser) {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`, {
    method: 'PUT',
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(settingsUser)
  });
  const content = await rawResponse.json();

  return content;

}
