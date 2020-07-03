export default class Game {
  constructor(spinnerOn, spinnerOff,
    transitionGameToResults, getRandomWords) {
    this.spinnerOn = spinnerOn;
    this.spinnerOff = spinnerOff;
    this.transitionGameToResults = transitionGameToResults;
    this.getRandomWords = getRandomWords;
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
    this.game.querySelectorAll('.point').forEach((point) => {
      point.classList.remove('activePoint');
    });
    event.target.classList.add('activePoint');
    await this.newGame();
  }

  isClickOnWords(event) {
    if (this.game.querySelector('.input').classList.contains('none')) {
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
    const images = this.game.querySelector('.img');
    const translation = this.game.querySelector('.translation');
    const audio = this.game.querySelector('.audio');
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
    return event.target.classList.contains('user-speach');
  }

  clickOnButtonSpeak() {
    if (!this.game.querySelector('.user-speach').classList.contains('activeBtn')) {
      this.resetGameContainer();
      this.game.querySelector('.translation').classList.add('none');
      this.game.querySelector('.input').classList.remove('none');
      this.game.querySelector('.user-speach').innerHTML = 'Stop speak';
      this.game.querySelector('.user-speach').classList.add('activeBtn');
      this.game.querySelector('.input').value = '';
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
        this.game.querySelector('.input').value = word;
        if (word[word.length - 1] === '.') {
          word = word.substring(0, word.length - 1);
        }
        this.checkedTrueWord(word);
      });
      this.recognition.addEventListener('end', this.recognition.start);
    } else {
      this.resetGameContainer();
      this.game.querySelector('.user-speach').innerHTML = 'Speak please';
      this.game.querySelector('.input').value = '';
      this.stopRecognition();
    }
  }

  checkedTrueWord(word) {
    const images = this.game.querySelector('.img');
    this.activeArray.forEach((activeWord, index) => {
      if (word === activeWord.word) {
        this.game.querySelectorAll('.word')[index].parentElement.classList.add('activeItem');
        const result = this.getInfoByWord(word);
        images.src = this.src + result.image;
        const starContainer = document.createElement('div');
        starContainer.classList.add('star');
        this.game.querySelector('.score').append(starContainer);
        this.activeArray[index].isGuess = true;
      }
    });
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
    this.stopRecognition();
    this.resetGameContainer();
    this.resetActiveArray();
  }

  resetActiveArray() {
    this.activeArray.forEach((activeWord, index) => {
      this.activeArray[index].isGuess = false;
    });
  }

  resetGameContainer() {
    this.game.querySelector('.translation').classList.remove('none');
    this.game.querySelector('.input').classList.add('none');
    this.game.querySelector('.score').innerHTML = '';
    this.game.querySelector('.user-speach').innerHTML = 'Speak please';
    this.game.querySelector('.translation').innerHTML = '';
    this.game.querySelector('.user-speach').classList.remove('activeBtn');
    const image = this.game.querySelector('.img');
    image.src = './assets/img/speakit/blank.jpg';
    const items = this.game.querySelectorAll('.item');
    for (let i = 0; i < items.length; i += 1) {
      items[i].classList.remove('activeItem');
    }
  }

  static isClickOnButtonResult(event) {
    return event.target.classList.contains('result');
  }

  stopRecognition() {
    if (this.recognition) {
      this.recognition.stop();
      this.recognition.removeEventListener('end', this.recognition.start);
    }
  }

  getItems(arrayWords) {
    this.items = document.createElement('div');
    this.items.classList.add('items');
    for (let i = 0; i < arrayWords.length; i += 1) {
      const keyValue = `<div class="item" data-current="${arrayWords[i].current}"><span class="audio-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fill-rule="evenodd"></path></svg></span><p class="word">${arrayWords[i].word}</p><p class="transcription">${arrayWords[i].transcription}</p><p class="translation">${arrayWords[i].translation}</p></div>`;
      this.items.insertAdjacentHTML('beforeend', keyValue);
    }
    return this.items;
  }

  updateItems(arrayWords) {
    this.items = this.game.querySelectorAll('.item');
    for (let i = 0; i < arrayWords.length; i += 1) {
      this.items[i].classList.remove('activeItem');
      this.items[i].dataset.current = arrayWords[i].current;
      this.items[i].querySelector('.word').innerHTML = arrayWords[i].word;
      this.items[i].querySelector('.transcription').innerHTML = arrayWords[i].transcription;
      this.items[i].querySelector('.translation').innerHTML = arrayWords[i].translation;
    }
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

    const buttonRestart = document.createElement('button');
    buttonRestart.classList.add('btn');
    buttonRestart.classList.add('restart');
    buttonRestart.innerHTML = 'Restart';
    buttonsContainer.append(buttonRestart);

    const buttonVoice = document.createElement('button');
    buttonVoice.classList.add('btn');
    buttonVoice.classList.add('voice');
    buttonVoice.classList.add('user-speach');
    buttonVoice.innerHTML = 'Speak please';
    buttonsContainer.append(buttonVoice);

    const buttonResult = document.createElement('button');
    buttonResult.classList.add('btn');
    buttonResult.classList.add('result');
    buttonResult.innerHTML = 'Results';
    buttonsContainer.append(buttonResult);

    return buttonsContainer;
  }

  searchNumberGroupByActivePoint() {
    let resIndex = -1;
    this.game.querySelectorAll('.point').forEach((point, index) => {
      if (point.classList.contains('activePoint')) {
        resIndex = index;
      }
    });
    return resIndex;
  }

  async newGame() {
    this.spinnerOn();
    this.activeArray = await this.getRandomWords(this.searchNumberGroupByActivePoint());
    this.spinnerOff();
    this.updateItems(this.activeArray);
    this.resetGameContainer();
    this.stopRecognition();
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
