/* eslint-disable no-console */
import menuHandling from './app/main/menu/menu';

import {
  createLayout, createAudio, getWordArr, wordListlistener, createSpeakIcon,
} from './app/games/audiochallenge/index';

window.onload = () => {
  menuHandling();
};

async function createPage() {
  createLayout();
  createSpeakIcon();
  await getWordArr();
  await createAudio();
  wordListlistener();
}

createPage();
