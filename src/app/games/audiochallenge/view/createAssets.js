import { getMedia } from '../../../common/index';

function createSpeakIcon() {
  const div = document.createElement('div');
  div.classList.add('speak-icon');
  document.querySelector('.answer__wrapper').prepend(div);
}

function createImage() {
  document.querySelector('.image__wrapper').innerHTML = '';

  const image = document.createElement('img');
  image.classList.add('audiochallenge-image');

  const srcElem = document.querySelector('[data-image]');
  image.src = getMedia(srcElem.dataset.image);

  document.querySelector('.image__wrapper').append(image);
}

function createTrueWord() {
  const word = document.querySelector('.true-word');

  word.textContent = document.querySelector('[data-word]').dataset.word;
}

export { createSpeakIcon, createImage, createTrueWord };
