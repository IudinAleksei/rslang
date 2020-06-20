import commonFetch from '../backendWords/commonFetch';

export async function wordInfo(word) {
  const url = `https://wordsapiv1.p.rapidapi.com/words/%7B${word}%7D`;
  const content = commonFetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
      'x-rapidapi-key': '3ef56dc86fmshe2271374854aa59p178e74jsnba1976e16bc5',
    },
  });

  return content;
}

export async function similarTo(word) {
  const url = `https://wordsapiv1.p.rapidapi.com/words/%7B${word}%7D/similarTo`;
  const content = commonFetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
      'x-rapidapi-key': '3ef56dc86fmshe2271374854aa59p178e74jsnba1976e16bc5',
    },
  });

  return content;
}
