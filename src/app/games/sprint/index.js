import './sass/style.scss';
import renderGame from './view/view';
import springGamePageHandling from './controls/controls';

export default function startGame() {
  renderGame();
  springGamePageHandling();
}
