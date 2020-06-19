import './sass/style.scss';
import Intro from './intro';
import Appcontainer from './container';
import Results from './results';

export default class App {
  constructor() {
    this.isMode = true;
    this.group = 0;
    this.src = 'https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/';
  }

  initApp() {
    const body = document.querySelector('body');
    this.main = document.createElement('main');
    this.main.classList.add('main');

    this.intro = new Intro();
    this.main.prepend(this.intro.getIntro());

    this.appcontainer = new Appcontainer();
    const response = this.initWords(this.group);
    this.main.append(this.appcontainer.render(response));

    this.results = new Results();
    this.main.append(this.results.render(response));

    const keyValue = ' <audio class="audio" src=""></audio>';
    this.main.insertAdjacentHTML('beforeend', keyValue);
    body.prepend(this.main);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
    }
  }

  addListeners() {
    document.addEventListener('click', (event) => this.handlerClick(event));
    window.addEventListener('hashchange', () => this.navigate());
  }

  handlerClick(event) {
    if (this.isClickOnPoints(event)) {
      this.clickOnPoints(event);
    }

    if (this.isClickOnWords(event)) {
      this.clickOnWords();
    }

    if (this.isClickOnButtonSpeak(event)) {
      this.clickOnButtonSpeak();
    }

    if (this.isClickOnButtonRestart(event)) {
      this.clickOnButtonRestart();
    }

    if (this.isClickOnButtonResult(event)) {
      this.clickOnButtonResult();
    }
    if (this.isClickOnButtonReturn(event)) {
      this.clickOnButtonReturn();
    }

    if (this.isClickOnButtonNewGame(event)) {
      this.clickOnButtonNewGame();
    }
  }

  isClickOnPoints(event) {
    return event.target.parentNode.classList.contains('points');
  }

  clickOnPoints(event) {
    const group = this.getRandomArbitrary(0, 5);
    const response = this.initWords(group);
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
        this.getActiveItem(event.target.parentNode);
        return true;
      }
      if (event.target.parentNode.parentNode.parentNode.classList.contains('item')) {
        this.wordActive = event.target.parentNode.parentNode.parentNode.querySelector('.word').textContent;
        this.translationActive = event.target.parentNode.parentNode.parentNode.querySelector('.translation').textContent;
        this.getActiveItem(event.target.parentNode.parentNode.parentNode);
        return true;
      }
      if (event.target.classList.contains('item')) {
        this.wordActive = event.target.querySelector('.word').textContent;
        this.translationActive = event.target.querySelector('.translation').textContent;
        this.getActiveItem(event.target);
        return true;
      }
    }
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

  isClickOnButtonSpeak(event) {
    if (event.target.classList.contains('user-speach')) {
      if (!document.querySelector('.translation').classList.contains('none')) {
        return true;
      }
    }
  }

  clickOnButtonSpeak() {
    document.querySelector('.translation').classList.add('none');
    document.querySelector('.input').classList.remove('none');
    const image = document.querySelector('.img');
    image.setAttribute('src', './assets/img/blank.jpg');
    const items = document.querySelectorAll('.item');
    for (let i = 0; i < items.length; i = +1) {
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
    for (let i = 0; i < items.length; i = +1) {
      if (word === items[i].innerText) {
        items[i].parentElement.classList.add('activeItem');
        const result = this.getInfoByWord(word);
        images.setAttribute('src', this.src + result[0]);
        const keyValue = '<div class="star"></div>';
        document.querySelector('.score').insertAdjacentHTML('beforeend', keyValue);
      }
    }
  }

  getInfoByWord(word) {
    const result = [];
    for (let i = 0; i < this.json.length / 2; i = +1) {
      if (this.json[i].word === word) {
        result.push(this.json[i].image);
        result.push(this.json[i].audio);
      }
    }
    return result;
  }

  getActiveItem(target) {
    const items = document.querySelectorAll('.item');
    for (let i = 0; i < items.length; i = +1) {
      items[i].classList.remove('activeItem');
    }
    target.classList.add('activeItem');
  }

  isClickOnButtonRestart(event) {
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
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('activeItem');
    }
  }

  isClickOnButtonResult() {
    if (event.target.classList.contains('result')) {
      return true;
    }
  }

  clickOnButtonResult() {
    document.querySelector('.results').classList.remove('hidden');
    document.querySelector('.container').classList.add('hidden');
  }

  isClickOnButtonReturn() {
    if (event.target.classList.contains('return')) {
      return true;
    }
  }

  clickOnButtonReturn() {
    document.querySelector('.results').classList.add('hidden');
    document.querySelector('.container').classList.remove('hidden');
  }

  isClickOnButtonNewGame() {
    if (event.target.classList.contains('new-game')) {
      return true;
    }
  }

  clickOnButtonNewGame() {
    document.querySelector('.results').classList.add('hidden');
    document.querySelector('.container').classList.remove('hidden');
    document.querySelector('.translation').classList.remove('none');
    this.clickOnButtonRestart();
  }

  async getTranslation(word) {
    const key = 'trnsl.1.1.20200424T174558Z.39de9cd79c70e957.6d82f0080ca311d8fb2ae17aad1c3d9661aa636b';
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${word}&lang=en-ru`;
    const res = await fetch(url);
    const data = await res.json();
    this.translation = data.text[0];
  }

  async initWords(group) {
    const page = this.getRandomArbitrary(0, 29);
    const arrayWords = [];
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
    const res = await fetch(url);
    this.json = await res.json();
    for (let i = 0; i < this.json.length / 2; i = +1) {
      await this.getTranslation(this.json[i].word);
      arrayWords.push({
        word: this.json[i].word,
        translation: this.translation,
        isGuess: false,
        transcription: this.json[i].transcription,
        image: this.json[i].image,
        audio: this.json[i].audio,
        current: this.getDataCurrent(this.json[i].image),
      });

      // let keyValue = `<div class="item" data-current="${data_current}"><span class="audio-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fill-rule="evenodd"></path></svg></span><p class="word">${this.json[i].word}</p><p class="transcription">${this.json[i].transcription}</p><p class="translation">${this.translation}</p></div>`;
      // this.items.insertAdjacentHTML('beforeend', keyValue);
      // let translation = this.appcontainer.querySelector('.translation');
      // translation.div.insertAdjacentHTML('beforebegin', 'words.translation');
    }
    const arrr = await Promise.resolve(arrayWords);

    return arrayWords;
  }

  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getDataCurrent(stringCurrent) {
    stringCurrent = stringCurrent.substring(9, 13);
    stringCurrent = parseFloat(stringCurrent);
    return stringCurrent;
  }
}
