import createLayout from './createLayout';
import createAudio from './createAudio';
import { getWord, getWordArr } from './wordList';
import {
  wordListlistener, buttonListener, audioIconListener, keyboardListener,
} from '../controls/listeners';
import { createSpeakIcon, createImage, createTrueWord } from './createAssets';

export default async function startAudiochallengeGame(arr) {
  createLayout();
  createSpeakIcon();
  await getWord(arr);
  await getWordArr();
  await createAudio();
  createImage();
  createTrueWord();
  audioIconListener();
  wordListlistener();
  buttonListener();
  keyboardListener();
}
