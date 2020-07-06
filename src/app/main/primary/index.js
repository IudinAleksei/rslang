import './sass/sass/style.scss';
import mainGame from './logicMainGame';
import mainGameHandling from './controls/control';

function game() {
  mainGame();
  mainGameHandling();
}

export default game;
