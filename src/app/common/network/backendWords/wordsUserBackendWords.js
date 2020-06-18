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