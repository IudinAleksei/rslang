/* eslint-disable no-console */
import { getWords, getRandomInteger } from '../../../common/index';
import Game from './game';

export default async function startGame(level = 0) {
  const arr = await getWords(level, getRandomInteger(0, 29));
  const game = new Game(arr);
  game.renderLayout();
  game.play();
}
