export default function createLayout() {
  const assets = document.createElement('div');
  assets.classList.add('audiochallenge-assets');

  const list = document.createElement('div');
  list.classList.add('audiochallenge-list');

  const button = document.createElement('button');
  button.classList.add('button');
  button.textContent = 'I don\'t know';

  document.querySelector('.main-container').append(assets, list, button);
}
