import './sass/style.scss';
import renderStartPage from './view/view';
import addEventListenerForStartPage from './controls/controls';

export default function startSprintGame() {
  renderStartPage();
  addEventListenerForStartPage();
}
