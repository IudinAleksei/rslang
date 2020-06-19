import { createWordList, createAudio } from './app/games/audiochallenge/index';

window.onload = () => {
  createWordList();
  setTimeout(createAudio, 2000);
};
