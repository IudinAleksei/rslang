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