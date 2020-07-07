import './sass/sass/style.scss';
import mainGame from './logicMainGame';
import mainGameHandling from './controls/control';

function game(sliderCounterNewWords, sliderCounterCards) {
  mainGame(sliderCounterNewWords, sliderCounterCards);
  mainGameHandling();
}

export default game;
