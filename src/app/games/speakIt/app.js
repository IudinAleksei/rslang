import './sass/style.scss';
import Intro from './components/intro';
import Appcontainer from './components/container';
import Results from './components/results';
import { getLoader, spinnerOn, spinnerOff } from './components/loader';
import {
  getWords,
  translateEngToRus,
} from '../../common/index';

export default class App {
  constructor() {
    this.isMode = true;
    this.group = 0;
    this.src = 'https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/';
  }

  async initApp() {
    const main = document.querySelector('.main');
    this.main = document.createElement('div');
    this.main.id = 'speakit';
    App.initPreloader(this.main);
    this.intro = new Intro();
    this.main.prepend(this.intro.getIntro());

    this.appcontainer = new Appcontainer();
    this.arrayWords = await App.getRandomWords(this.group);
    this.main.append(this.appcontainer.render(this.arrayWords));

    this.results = new Results(this.clickOnButtonRestart.bind(this));
    this.main.append(this.results.render(this.arrayWords));

    const audioContainer = document.createElement('audio');
    audioContainer.classList.add('audio');
    audioContainer.src = '';
    this.main.append(audioContainer);
    main.prepend(this.main);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
    }
    spinnerOff();
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
      App.clickOnButtonResult();
    }
  }

  static isClickOnPoints(event) {
    return event.target.parentNode.classList.contains('points');
  }

  async clickOnPoints(event) {
    spinnerOn();
    const group = App.getRandomArbitrary(0, 5);
    const response = await App.getRandomWords(group);
    spinnerOff();
    this.items = document.querySelector('.items');
    this.items.innerHTML = '';
    this.items.append(this.appcontainer.getItems(response));

    const translation = document.querySelector('.translation');
    translation.innerHTML = '';
    const image = document.querySelector('.img');
    image.src = './assets/img/speakit/blank.jpg';
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
        App.getActiveItem(event.target);
        return true;
      }
    }
    return false;
  }

  async clickOnWords() {
    spinnerOn();
    const images = document.querySelector('.img');
    const translation = document.querySelector('.translation');
    const audio = document.querySelector('.audio');
    const result = this.getInfoByWord(this.wordActive);
    images.src = this.src + result[0];
    audio.src = this.src + result[1];
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {})
        .catch(() => {});
    }
    translation.innerText = '';
    translation.insertAdjacentHTML('beforeend', await translateEngToRus(this.wordActive));
    spinnerOff();
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
    image.src = './';
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
        images.src = this.src + result[0];
        const starContainer = document.createElement('div');
        starContainer.classList.add('star');
        document.querySelector('.score').append(starContainer);
      }
    }
  }

  getInfoByWord(word) {
    const result = [];
    for (let i = 0; i < this.arrayWords.length; i += 1) {
      if (this.arrayWords[i].word === word) {
        result.push(this.arrayWords[i].image);
        result.push(this.arrayWords[i].audio);
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
    image.src = './assets/img/speakit/blank.jpg';
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

  static initPreloader(main) {
    main.prepend(getLoader());
  }
}
