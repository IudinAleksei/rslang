import puzzleGameHandling from './controls/controls';
import showStartPuzzleGame from './view/start';
import './sass/style.scss';

function game(token) {
  showStartPuzzleGame(token);
  puzzleGameHandling();
}

export default game;
