/* eslint-disable import/no-cycle */
import Game from './game';

export default async function startGame(wordsArr, loginResponse) {
  const game = new Game(wordsArr, loginResponse);
  game.renderLayout();
  game.play();
}
