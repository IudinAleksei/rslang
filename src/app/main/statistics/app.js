import './sass/style.scss';
import Statistics from './components/statistics';
import {
  getLoader,
  spinnerOn,
  spinnerOff,
} from './components/loader';
import {
  getWords, getUserStatistic,
} from '../../common/index';

export default class App {
  constructor() {
    this.arrayCategory = ['main', 'chart'];
    this.arrayRow = ['word', 'translation', 'isGuess', 'correct answer', 'error answer', '% errors', 'Last date'];
    this.statistics = new Statistics(this.arrayCategory);
    this.group = 0;
  }

  async initApp(root) {
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
    const data = [{
      wordsLearned: 10,
      date: Date.parse('2020-06-07'),
    }, {
      wordsLearned: 2,
      date: Date.parse('2020-06-08'),
    }, {
      wordsLearned: 13,
      date: Date.parse('2020-06-09'),
    }, {
      wordsLearned: 7,
      date: Date.parse('2020-06-09'),
    }, {
      wordsLearned: 5,
      date: Date.parse('2020-06-11'),
    }];
    this.arrayWords = await App.getRandomWords(this.group);
    this.main.prepend(this.statistics.render(this.arrayWords, this.arrayRow, data));
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

  static async getRandomWords(group) {
    const page = App.getRandomArbitrary(0, 29);
    const arrayWords = [];
    const activeWords = await getWords(group, page);
    for (let i = 0; i < activeWords.length / 2; i += 1) {
      arrayWords.push({
        word: activeWords[i].word,
        isGuess: false,
        transcription: activeWords[i].transcription,
        translation: activeWords[i].wordTranslate,
        image: activeWords[i].image,
        audio: activeWords[i].audio,
        current: App.getDataCurrent(activeWords[i].image),
      });
    }
    return arrayWords;
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
