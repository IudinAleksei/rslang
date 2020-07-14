import { getMedia } from '../../../common/index';

export default async function createAudio() {
  const audio = document.createElement('audio');
  audio.classList.add('audiochallenge__word-audio');
  audio.setAttribute('id', 'audiochallenge__word-audio');
  const srcElem = document.querySelector('[data-audio]');
  audio.src = getMedia(srcElem.dataset.audio);
  audio.setAttribute('data-translate', srcElem.textContent);
  document.querySelector('.audiochallenge__audio__wrapper').innerHTML = '';
  document.querySelector('.audiochallenge__audio__wrapper').append(audio);
  audio.play();
}
