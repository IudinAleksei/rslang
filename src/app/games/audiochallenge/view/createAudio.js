import { getMedia } from '../../../common/index';

export default async function createAudio() {
  const audio = document.createElement('audio');
  audio.classList.add('word-audio');
  audio.setAttribute('id', 'word-audio');
  const srcElem = document.querySelector('[data-audio]');
  audio.src = getMedia(srcElem.dataset.audio);
  audio.setAttribute('data-translate', srcElem.textContent);
  document.querySelector('.audio__wrapper').innerHTML = '';
  document.querySelector('.audio__wrapper').append(audio);
  audio.play();
}
