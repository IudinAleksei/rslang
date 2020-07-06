import './sass/style.scss';
import renderStartPage from './view/view';
import addEventListenerForStartPage from './gameLogic';

export default function startSprintGame() {
  renderStartPage();
  addEventListenerForStartPage();
}
