/* eslint-disable no-console */
import menuHandling from './app/main/menu/menu';

import { createAudio, getWordArr, listener } from './app/games/audiochallenge/index';

window.onload = () => {
  menuHandling();
};

async function createPage() {
  await createAudio();
  await getWordArr();
  listener();
}

createPage();
