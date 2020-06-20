import commonFetch from '../backendWords/commonFetch';

export async function wordInfo(word) {
  const url = `https://wordsapiv1.p.rapidapi.com/words/${word}`;
  const content = commonFetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
      'x-rapidapi-key': '02df4fb51bmsh702ed367223bfccp13c6d8jsnf367d77b2d56',
    },
  });

  return content;
}

export async function partOfSpeech(part) {
  const url = `https://wordsapiv1.p.rapidapi.com/words/?partOfSpeech=${part}&limit=100&page=3`;
  const content = commonFetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
      'x-rapidapi-key': '02df4fb51bmsh702ed367223bfccp13c6d8jsnf367d77b2d56',
    },
  });

  return content;
}
