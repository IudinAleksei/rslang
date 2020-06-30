import createLayout from './createLayout';
import createAudio from './createAudio';
import getWordArr from './wordList';
import { wordListlistener, buttonListener } from '../controls/listeners';
import { createSpeakIcon } from './createAssets';

export default async function startAudiochallengeGame() {
  createLayout();
  createSpeakIcon();
  await getWordArr();
  await createAudio();
  wordListlistener();
  buttonListener();
}
