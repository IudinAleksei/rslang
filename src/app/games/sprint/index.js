import './sass/style.scss';
import renderGame from './view/view';
import sprintGamePageHandling from './gameLogic';

export default function startSprintGame() {
  renderGame();
  sprintGamePageHandling();
}
