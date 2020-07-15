/* eslint-disable import/no-cycle */
import '../dictionary/sass/preloader.scss';
import mainGame from './logicMainGame';
import mainGameHandling from './controls/control';

function gameTraining() {
  mainGame();
  mainGameHandling();
}

export default gameTraining;
