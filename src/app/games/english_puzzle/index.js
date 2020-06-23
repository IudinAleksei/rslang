import showGamePage from './view/gamePage';
import getWord from './logicsGame';
import puzzleGameHandling from './controls/controls';

function game() {
  showGamePage();
  getWord();
  puzzleGameHandling();
}

export default game;
