import menuHandling from './app/main/menu/menu';

import { createAudio, getWordArr } from './app/games/audiochallenge/index';

window.onload = () => {
  menuHandling();

  createAudio();
};

setTimeout(() => {
  getWordArr();
}, 1000);
