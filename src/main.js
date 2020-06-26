import menuHandling from './app/main/menu/menu';
import game from './app/games/english_puzzle/index';
import './app/games/english_puzzle/sass/style.scss';

window.onload = () => {
  game();
  menuHandling();
};
