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