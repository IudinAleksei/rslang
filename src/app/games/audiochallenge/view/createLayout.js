export default function createLayout() {
  const assets = document.createElement('div');
  assets.classList.add('audiochallenge-assets');

  const image = document.createElement('div');
  image.classList.add('image__wrapper');

  const audio = document.createElement('div');
  audio.classList.add('audio__wrapper');

  assets.append(audio, image);

  const list = document.createElement('div');
  list.classList.add('audiochallenge-list');

  const button = document.createElement('button');
  button.classList.add('button');
  button.textContent = 'I don\'t know';

  document.querySelector('.main-container').append(assets, list, button);
}
