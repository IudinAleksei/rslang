export default class Game {
  constructor(spinnerOn, spinnerOff,
    transitionGameToResults, getRandomWords, getRandomArbitrary) {
    this.spinnerOn = spinnerOn;
    this.spinnerOff = spinnerOff;
    this.transitionGameToResults = transitionGameToResults;
    this.getRandomWords = getRandomWords;
    this.getRandomArbitrary = getRandomArbitrary;
    this.activeArray = [];
    this.maxPoint = 6;
    this.activePoint = 0;
    this.src = 'https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/';
  }

  render(arrayWords) {
    this.activeArray = arrayWords;
    this.game = document.createElement('div');
    this.game.classList.add('game');
    this.game.classList.add('hidden');

    this.game.append(this.getHeaderResult());
    this.game.append(this.getImage());
    this.game.append(this.getItems(this.activeArray));

    this.game.append(Game.getButtons());

    const audioContainer = document.createElement('audio');
    audioContainer.classList.add('audio');
    audioContainer.src = '';
    this.game.append(audioContainer);
    this.game.addEventListener('click', (event) => this.handlerClick(event));

    return this.game;
  }

  handlerClick(event) {
    if (Game.isClickOnPoints(event)) {
      this.clickOnPoints(event);
    }

    if (this.isClickOnWords(event)) {
      this.clickOnWords();
    }

    if (Game.isClickOnButtonSpeak(event)) {
      this.clickOnButtonSpeak();
    }

    if (Game.isClickOnButtonRestart(event)) {
      this.clickOnButtonRestart();
    }

    if (Game.isClickOnButtonResult(event)) {
      this.transitionGameToResults();
    }
  }

  static isClickOnPoints(event) {
    return event.target.parentNode.classList.contains('points');
  }

  async clickOnPoints(event) {
    this.spinnerOn();
    const group = this.getRandomArbitrary(0, 5);
    this.activeArray = await this.getRandomWords(group);
    this.spinnerOff();
    this.items = document.querySelector('.items');
    this.items.innerHTML = '';
    this.items.append(this.getItems(this.activeArray));

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
        Game.getActiveItem(event.target.parentNode);
        return true;
      }
      if (event.target.parentNode.parentNode.parentNode.classList.contains('item')) {
        this.wordActive = event.target.parentNode.parentNode.parentNode.querySelector('.word').textContent;
        this.translationActive = event.target.parentNode.parentNode.parentNode.querySelector('.translation').textContent;
        Game.getActiveItem(event.target.parentNode.parentNode.parentNode);
        return true;
      }
      if (event.target.classList.contains('item')) {
        this.wordActive = event.target.querySelector('.word').textContent;
        Game.getActiveItem(event.target);
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
    images.src = this.src + result.image;
    audio.src = this.src + result.audio;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {})
        .catch(() => {});
    }
    translation.innerHTML = `${result.translation}`;
  }

  static isClickOnButtonSpeak(event) {
    if (event.target.classList.contains('user-speach')) {
      return event.target.classList.contains('user-speach');
    }
    return false;
  }

  clickOnButtonSpeak() {
    document.querySelector('.translation').classList.add('none');
    document.querySelector('.input').classList.remove('none');
    document.querySelector('.user-speach').innerHTML = 'Await...';
    document.querySelector('.input').innerHTML = '';
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
    }
    this.recognition.lang = 'en-US';
    this.recognition.start();
    this.recognition.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      let word = transcript.toLowerCase();
      document.querySelector('.input').value = word;
      if (word[word.length - 1] === '.') {
        word = word.substring(0, word.length - 1);
      }
      this.checkedTrueWord(word);
    });
  }

  checkedTrueWord(word) {
    const images = document.querySelector('.img');
    for (let i = 0; i < this.activeArray.length; i += 1) {
      if (word === this.activeArray[i].word) {
        document.querySelectorAll('.word')[i].parentElement.classList.add('activeItem');
        const result = this.getInfoByWord(word);
        images.src = this.src + result.image;
        const starContainer = document.createElement('div');
        starContainer.classList.add('star');
        document.querySelector('.score').append(starContainer);
        this.activeArray[i].isGuess = true;
      }
    }
    this.recognition.stop();
    this.recognition.removeEventListener('end', this.recognition.start);
    document.querySelector('.user-speach').innerHTML = 'Speak please';
  }

  getInfoByWord(word) {
    for (let i = 0; i < this.activeArray.length; i += 1) {
      if (this.activeArray[i].word === word) {
        return this.activeArray[i];
      }
    }
    return false;
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
    document.querySelector('.translation').classList.remove('none');
    this.inputContainer.classList.add('none');
    document.querySelector('.score').innerHTML = '';
    document.querySelector('.user-speach').innerHTML = 'Speak please';
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

  getItems(array) {
    this.items = document.createElement('div');
    this.items.classList.add('items');
    (async () => {
      const arrayWords = await array;
      for (let i = 0; i < arrayWords.length; i += 1) {
        const keyValue = `<div class="item" data-current="${arrayWords[i].current}"><span class="audio-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fill-rule="evenodd"></path></svg></span><p class="word">${arrayWords[i].word}</p><p class="transcription">${arrayWords[i].transcription}</p><p class="translation">${arrayWords[i].translation}</p></div>`;
        this.items.insertAdjacentHTML('beforeend', keyValue);
      }
    })();
    return this.items;
  }

  getHeaderResult() {
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('res');

    const pointsContainer = document.createElement('ul');
    pointsContainer.classList.add('points');
    resultContainer.append(pointsContainer);

    for (let i = 0; i < this.maxPoint; i += 1) {
      const pointContainer = document.createElement('li');
      pointContainer.classList.add('point');
      pointsContainer.append(pointContainer);
      if (i === this.activePoint) {
        pointContainer.classList.add('activePoint');
      }
    }

    const scoreContainer = document.createElement('div');
    scoreContainer.classList.add('score');
    resultContainer.append(scoreContainer);

    return resultContainer;
  }

  getImage() {
    const imagesContainer = document.createElement('div');
    imagesContainer.classList.add('images');
    const imagesFont = document.createElement('img');
    imagesFont.classList.add('img');
    imagesFont.src = './assets/img/speakit/blank.jpg';
    imagesFont.alt = 'blank';
    imagesContainer.append(imagesFont);
    const translationContainer = document.createElement('p');
    translationContainer.classList.add('translation');
    imagesContainer.append(translationContainer);

    this.inputContainer = document.createElement('input');
    this.inputContainer.type = 'text';
    this.inputContainer.classList.add('input');
    this.inputContainer.classList.add('none');
    this.inputContainer.readOnly = true;
    imagesContainer.append(this.inputContainer);

    return imagesContainer;
  }

  static getButtons() {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('btns');

    const buttonRestart = document.createElement('a');
    buttonRestart.href = '#';
    buttonRestart.classList.add('btn');
    buttonRestart.classList.add('restart');
    buttonRestart.innerHTML = 'Restart';
    buttonsContainer.append(buttonRestart);

    const buttonVoice = document.createElement('a');
    buttonVoice.href = '#';
    buttonVoice.classList.add('btn');
    buttonVoice.classList.add('voice');
    buttonVoice.classList.add('user-speach');
    buttonVoice.innerHTML = 'Speak please';
    buttonsContainer.append(buttonVoice);

    const buttonResult = document.createElement('a');
    buttonResult.href = '#';
    buttonResult.classList.add('btn');
    buttonResult.classList.add('result');
    buttonResult.innerHTML = 'Results';
    buttonsContainer.append(buttonResult);

    return buttonsContainer;
  }

  hiddenGame() {
    this.game.classList.add('hidden');
  }

  showGame() {
    this.game.classList.remove('hidden');
  }

  getActiveArray() {
    return this.activeArray;
  }
}
