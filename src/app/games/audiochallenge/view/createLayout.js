export default function createLayout() {
  const assets = document.createElement('div');
  assets.classList.add('audiochallenge-assets');

  const image = document.createElement('div');
  image.classList.add('image__wrapper');

  const answer = document.createElement('div');
  answer.classList.add('answer__wrapper');

  const trueWord = document.createElement('div');
  trueWord.classList.add('true-word');

  answer.append(trueWord);

  const audio = document.createElement('div');
  audio.classList.add('audio__wrapper');

  assets.append(audio, image, answer);

  const list = document.createElement('div');
  list.classList.add('audiochallenge-list');

  const button = document.createElement('button');
  button.classList.add('button', 'audiochallenge__button');
  button.textContent = 'I don\'t know';

  document.getElementById('audiochallenge').append(assets, list, button);
}
