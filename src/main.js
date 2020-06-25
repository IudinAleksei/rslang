/* eslint-disable no-console */
import menuHandling from './app/main/menu/menu';

import {
  createLayout, createAudio, getWordArr, listener, createSpeakIcon,
} from './app/games/audiochallenge/index';

window.onload = () => {
  menuHandling();
};

async function createPage() {
  createLayout();
  createSpeakIcon();
  await createAudio();
  await getWordArr();
  listener();
}

createPage();
