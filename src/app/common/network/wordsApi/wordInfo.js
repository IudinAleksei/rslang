export async function wordInfo(word) {
  const url = `https://wordsapiv1.p.rapidapi.com/words/%7B${word}%7D`;
  const content = fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
      'x-rapidapi-key': 'e793eb22b6msh30ddcd1c9ae6eb7p1b3fd4jsn734ccd910b4a',
    },
  });

  return content;
}

export async function similarTo(word) {
  const url = `https://wordsapiv1.p.rapidapi.com/words/%7B${word}%7D/similarTo`;
  const content = fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
      'x-rapidapi-key': 'e793eb22b6msh30ddcd1c9ae6eb7p1b3fd4jsn734ccd910b4a',
    },
  });

  return content;
}
