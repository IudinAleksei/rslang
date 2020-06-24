import './sass/style.scss';
import Intro from './components/intro';
import Appcontainer from './components/container';
import Results from './components/results';
import {
  getWords,
} from '../../common/index';

export default class App {
  constructor() {
    this.isMode = true;
    this.group = 0;
    this.src = 'https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/';
  }

  async initApp() {
    const body = document.querySelector('.main');
    this.main = document.createElement('div');
    this.main.id = 'speakit';
    this.intro = new Intro();
    this.main.prepend(this.intro.getIntro());

    this.appcontainer = new Appcontainer();
    const response = await App.getRandomWords(this.group);
    this.main.append(this.appcontainer.render(response));

    this.results = new Results();
    this.main.append(this.results.render(response));

    const audioContainer = document.createElement('audio');
    audioContainer.classList.add('audio');
    audioContainer.src = '';
    this.main.append(audioContainer);
    body.prepend(this.main);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
    }
    this.main.addEventListener('click', (event) => this.handlerClick(event));
  }

  handlerClick(event) {
    if (App.isClickOnPoints(event)) {
      this.clickOnPoints(event);
    }

    if (this.isClickOnWords(event)) {
      this.clickOnWords();
    }

    if (App.isClickOnButtonSpeak(event)) {
      this.clickOnButtonSpeak();
    }

    if (App.isClickOnButtonRestart(event)) {
      this.clickOnButtonRestart();
    }

    if (App.isClickOnButtonResult(event)) {
      this.clickOnButtonResult();
    }
    if (App.isClickOnButtonReturn(event)) {
      this.clickOnButtonReturn();
    }

    if (App.isClickOnButtonNewGame(event)) {
      this.clickOnButtonNewGame();
    }
  }

  static isClickOnPoints(event) {
    return event.target.parentNode.classList.contains('points');
  }

  clickOnPoints(event) {
    const group = App.getRandomArbitrary(0, 5);
    const response = App.getRandomWords(group);

    this.items = document.querySelector('.items');
    this.items.innerHTML = '';
    this.items.append(this.appcontainer.getItems(response));

    const translation = document.querySelector('.translation');
    translation.innerHTML = '';
    const image = document.querySelector('.img');
    image.setAttribute('src', './assets/img/blank.jpg');
    const points = document.querySelectorAll('.point');
    for (let i = 0; i < points.length; i += 1) {
      points[i].classList.remove('activePoint');
    }
    event.target.classList.add('activePoint');
  }

  isClickOnWords(event) {
    if (!event.target.classList.contains('point')) {
      if (event.target.parentNode.classList.contains('item')) {
        this.wordActive = event.target.parentNode.querySelector('.word').textContent;
        this.translationActive = event.target.parentNode.querySelector('.translation').textContent;
        App.getActiveItem(event.target.parentNode);
        return true;
      }
      if (event.target.parentNode.parentNode.parentNode.classList.contains('item')) {
        this.wordActive = event.target.parentNode.parentNode.parentNode.querySelector('.word').textContent;
        this.translationActive = event.target.parentNode.parentNode.parentNode.querySelector('.translation').textContent;
        App.getActiveItem(event.target.parentNode.parentNode.parentNode);
        return true;
      }
      if (event.target.classList.contains('item')) {
        this.wordActive = event.target.querySelector('.word').textContent;
        this.translationActive = event.target.querySelector('.translation').textContent;
        App.getActiveItem(event.target);
        return true;
      }
    }
    return false;
  }

  clickOnWords() {
    const images = document.querySelector('.img');
    const translation = document.querySelector('.translation');
    const audio = document.querySelector('.audio');
    const result = this.getInfoByWord(this.wordActive);
    images.setAttribute('src', this.src + result[0]);
    audio.setAttribute('src', this.src + result[1]);
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {})
        .catch(() => {});
    }
    translation.innerText = '';
    translation.insertAdjacentHTML('beforeend', this.translationActive);
    this.getInfoByWord(this.wordActive);
  }

  static isClickOnButtonSpeak(event) {
    if (event.target.classList.contains('user-speach')) {
      return document.querySelector('.translation').classList.contains('none');
    }
    return false;
  }

  clickOnButtonSpeak() {
    document.querySelector('.translation').classList.add('none');
    document.querySelector('.input').classList.remove('none');
    const image = document.querySelector('.img');
    image.setAttribute('src', './assets/img/blank.jpg');
    const items = document.querySelectorAll('.item');
    for (let i = 0; i < items.length; i += 1) {
      items[i].classList.remove('activeItem');
    }

    this.recognition.lang = 'en-US';
    this.recognition.start();
    this.recognition.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      const word = transcript.toLowerCase();
      document.querySelector('.input').value = word;
      this.checkedTrueWord(word);
    });
    this.recognition.addEventListener('end', this.recognition.start);
  }

  checkedTrueWord(word) {
    const images = document.querySelector('.img');
    const items = document.querySelectorAll('.word');
    for (let i = 0; i < items.length; i += 1) {
      if (word === items[i].innerText) {
        items[i].parentElement.classList.add('activeItem');
        const result = this.getInfoByWord(word);
        images.setAttribute('src', this.src + result[0]);
        const starContainer = document.createElement('div');
        starContainer.classList.add('star');
        document.querySelector('.score').append(starContainer);
      }
    }
  }

  getInfoByWord(word) {
    const result = [];
    for (let i = 0; i < this.activeWords.length / 2; i += 1) {
      if (this.activeWords[i].word === word) {
        result.push(this.activeWords[i].image);
        result.push(this.activeWords[i].audio);
      }
    }
    return result;
  }

  static getActiveItem(target) {
    const items = document.querySelectorAll('.item');
    for (let i = 0; i < items.length; i += 1) {
      items[i].classList.remove('activeItem');
    }
    target.classList.add('activeItem');
  }

  static isClickOnButtonRestart(event) {
    return event.target.classList.contains('restart');
  }

  clickOnButtonRestart() {
    this.recognition.stop();
    this.recognition.removeEventListener('end', this.recognition.start);
    document.querySelector('.translation').classList.remove('none');
    document.querySelector('.input').classList.add('none');
    document.querySelector('.score').innerHTML = '';
    document.querySelector('.translation').innerHTML = '';
    const image = document.querySelector('.img');
    image.setAttribute('src', './assets/img/blank.jpg');
    const items = document.querySelectorAll('.item');
    for (let i = 0; i < items.length; i += 1) {
      items[i].classList.remove('activeItem');
    }
  }

  static isClickOnButtonResult(event) {
    return event.target.classList.contains('result');
  }

  static clickOnButtonResult() {
    document.querySelector('.results').classList.remove('hidden');
    document.querySelector('.container').classList.add('hidden');
  }

  static isClickOnButtonReturn(event) {
    return event.target.classList.contains('return');
  }

  static clickOnButtonReturn() {
    document.querySelector('.results').classList.add('hidden');
    document.querySelector('.container').classList.remove('hidden');
  }

  static isClickOnButtonNewGame(event) {
    return event.target.classList.contains('new-game');
  }

  clickOnButtonNewGame() {
    document.querySelector('.results').classList.add('hidden');
    document.querySelector('.container').classList.remove('hidden');
    document.querySelector('.translation').classList.remove('none');
    this.clickOnButtonRestart();
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
        image: this.activeWords.image,
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
}
