import './sass/style.scss';
import Intro from './components/intro';
import Game from './components/game';
import Results from './components/results';
import {
  getLoader,
  spinnerOn,
  spinnerOff,
} from './components/loader';
import {
  getWords,
  translateEngToRus,
} from '../../common/index';

export default class App {
  constructor() {
    this.intro = new Intro(this.transitionIntroToGame.bind(this));
    this.game = new Game(spinnerOn, spinnerOff, translateEngToRus,
      this.transitionGameToResults.bind(this));
    this.results = new Results(this.game.clickOnButtonRestart.bind(this),
      this.transitionResultsToGame.bind(this));
    this.group = 0;
  }

  async initApp() {
    const main = document.querySelector('.main');
    this.main = document.createElement('div');
    this.main.id = 'speakit';
    this.arrayWords = await App.getRandomWords(this.group);
    this.main.prepend(getLoader());
    this.main.prepend(this.intro.getIntro());
    this.main.append(this.game.render(this.arrayWords));
    this.main.append(this.results.render(this.arrayWords));
    main.prepend(this.main);
    spinnerOff();
  }

  static async getRandomWords(group) {
    const page = App.getRandomArbitrary(0, 29);
    const arrayWords = [];
    this.activeWords = await getWords(group, page);
    for (let i = 0; i < this.activeWords.length / 2; i += 1) {
      arrayWords.push({
        word: this.activeWords[i].word,
        isGuess: false,
        transcription: this.activeWords[i].transcription,
        image: this.activeWords[i].image,
        audio: this.activeWords[i].audio,
        current: App.getDataCurrent(this.activeWords[i].image),
      });
    }
    return arrayWords;
  }

  static getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static getDataCurrent(stringCurrent) {
    let buf = stringCurrent.substring(9, 13);
    buf = parseFloat(stringCurrent);
    return buf;
  }

  transitionIntroToGame() {
    this.intro.hiddenIntro();
    this.game.showGame();
  }

  transitionGameToResults() {
    this.game.hiddenGame();
    this.Results.showResults();
  }

  transitionResultsToGame() {
    this.intro.hiddenResults();
    this.game.showGame();
  }
}
