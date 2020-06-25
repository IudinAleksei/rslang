import menuHandling from './app/main/menu/menu';
import startGame from './app/games/sprint/index';

window.onload = () => {
  menuHandling();
  startGame();
};
