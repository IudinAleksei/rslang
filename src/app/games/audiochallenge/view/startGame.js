import createLayout from './createLayout';
import createAudio from './createAudio';
import getWordArr from './wordList';
import {
  wordListlistener, buttonListener, audioIconListener, keyboardListener,
} from '../controls/listeners';
import { createSpeakIcon, createImage, createTrueWord } from './createAssets';

export default async function startAudiochallengeGame(level) {
  createLayout();
  createSpeakIcon();
  await getWordArr(level);
  await createAudio();
  createImage();
  createTrueWord();
  audioIconListener();
  wordListlistener();
  buttonListener();
  keyboardListener();
}
