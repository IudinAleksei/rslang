export async function getWords(group, page) {
  try {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`);
    const content = await rawResponse.json();
    return content;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getCountWords(group, wordsPerExampleSentence, words) {
  try {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/words/count?group=${group}&wordsPerExampleSentenceLTE=${wordsPerExampleSentence}&wordsPerPage=${words}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    const content = await rawResponse.json();
    return content;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getWordById(wordId) {
  try {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/words/${wordId}`);
    const content = await rawResponse.json();
    return content;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createUser(user) {
  try {
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
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function loginUser(user) {
  try {
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
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateUser(token, userId, user) {
  try {
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
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function deleteUser(token, userId) {
  try {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users//${userId}`, {
      method: 'DELETE',
      withCredentials: true,
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`,
      }
    });

    return rawResponse;
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function getAllUserWords(token, userId) {
  try {
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
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function createUserWord(token, userId, wordId, word) {
  try {
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
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function updateUserWord(token, userId, wordId, word) {
  try {
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
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUserWordById(token, userId, wordId) {
  try {
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
  } catch (error) {
    console.log(error);
    return null;
  }

}

export async function deleteUserWordById(token, userId, wordId) {
  try {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: 'DELETE',
      withCredentials: true,
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`,
      }
    });

    return rawResponse;
  } catch (error) {
    console.log(error);
    return null;
  }

}

export async function getUserStatistic(token, userId) {
  try {
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
  } catch (error) {
    console.log(error);
    return null;
  }

}

export async function upsertUserStatistic(token, userId, learnedWords) {
  try {
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
  } catch (error) {
    console.log(error);
    return null;
  }

}

export async function getUserSettings(token, userId) {
  try {
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
  } catch (error) {
    console.log(error);
    return null;
  }

}

export async function upsertUserSettings(token, userId, settingsUser) {
  try {
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
  } catch (error) {
    console.log(error);
    return null;
  }

}