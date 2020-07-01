import puzzleGameHandling from './controls/controls';
import showStartPuzzleGame from './view/start';
import './sass/style.scss';

function gamePuzzle(token) {
  showStartPuzzleGame(token);
  puzzleGameHandling();
}

export default gamePuzzle;
