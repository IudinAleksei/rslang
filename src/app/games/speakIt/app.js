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
} from '../../common/index';

export default class App {
  constructor() {
    this.intro = new Intro(this.transitionIntroToGame.bind(this));
    this.game = new Game(spinnerOn, spinnerOff,
      this.transitionGameToResults.bind(this), App.getRandomWords, App.getRandomArbitrary);
    this.results = new Results(this.game.clickOnButtonRestart.bind(this.game),
      this.transitionResultsToGame.bind(this));
    this.group = 0;
  }

  async initApp(root) {
    const mainContainer = document.querySelector('.main-container');
    const divBackground = document.createElement('div');
    divBackground.className = 'main__background-speakit';
    mainContainer.prepend(divBackground);
    this.main = document.createElement('div');
    this.main.id = 'speakit';
    root.append(this.main);
    this.main.prepend(getLoader());
    spinnerOn();
    this.arrayWords = await App.getRandomWords(this.group);
    this.main.prepend(this.intro.getIntro());
    this.main.append(this.game.render(this.arrayWords));
    this.main.append(this.results.render(this.arrayWords));
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
}
