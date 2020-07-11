import './sass/style.scss';
import Statistics from './components/statistics';
import {
  getLoader,
  spinnerOn,
  spinnerOff,
} from './components/loader';
import {
  getAllUserWords,
  getUserStatistic,
} from '../../common/index';

export default class App {
  constructor() {
    this.arrayCategory = ['main', 'chart'];
    this.arrayRow = ['word', 'translation', 'correct answer', '% errors', 'date'];
    this.statistics = new Statistics(this.arrayCategory);
    this.group = 0;
  }

  async initApp(root, token, userId) {
    const mainContainer = document.querySelector('.main-container');
    const divBackground = document.createElement('div');
    divBackground.className = 'main__background-statistics';
    mainContainer.prepend(divBackground);
    this.main = document.createElement('div');
    this.main.id = 'statistics';
    mainContainer.prepend(App.getHeaderPage('statistics'));
    root.append(this.main);
    this.main.prepend(getLoader());
    spinnerOn();
    const statisticsChart = await getUserStatistic(token, userId);
    this.arrayWords = await getAllUserWords(token, userId);
    // eslint-disable-next-line no-prototype-builtins
    if (statisticsChart.hasOwnProperty('optional')) {
      // eslint-disable-next-line no-prototype-builtins
      if (statisticsChart.optional.hasOwnProperty('days')) {
        this.main.prepend(this.statistics.render(this.arrayWords, this.arrayRow,
          statisticsChart.optional.days));
      }
    } else {
      this.main.prepend(this.statistics.render(this.arrayWords, this.arrayRow,
        null));
    }
    spinnerOff();
  }

  transitionIntroToGame() {
    this.intro.hiddenIntro();
    this.game.showGame();
  }

  transitionGameToResults() {
    this.game.hiddenGame();
    this.arrayWords = this.game.getActiveArray();
    this.results.updateResultsWord(this.arrayWords);
    this.results.showResults();
  }

  transitionResultsToGame() {
    this.results.hiddenResults();
    this.game.showGame();
  }

  static getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static getDataCurrent(stringCurrent) {
    return parseFloat(stringCurrent.substring(9, 13));
  }

  static getHeaderPage(nameHeader) {
    const header = document.createElement('h1');
    header.classList.add('title');
    header.innerHTML = nameHeader;
    return header;
  }
}
