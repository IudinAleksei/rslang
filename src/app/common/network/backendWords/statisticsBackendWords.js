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