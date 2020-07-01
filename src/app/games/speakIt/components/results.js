export default class Results {
  constructor(clickOnButtonRestart, transitionResultsToGame) {
    this.clickOnButtonRestart = clickOnButtonRestart;
    this.transitionResultsToGame = transitionResultsToGame;
    this.src = 'https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/';
  }

  render(array) {
    this.results = document.createElement('div');
    this.results.classList.add('results');
    this.results.classList.add('hidden');
    this.activeArray = array;

    this.resultContainer = document.createElement('div');
    this.resultContainer.classList.add('results-container');
    this.resultContainer.append(this.getResultsWord(this.activeArray));

    this.resultContainer.append(Results.getButtons());
    this.results.append(this.resultContainer);
    this.audioContainer = document.createElement('audio');
    this.audioContainer.classList.add('audio');
    this.audioContainer.src = '';
    this.results.append(this.audioContainer);

    this.results.addEventListener('click', (event) => this.handlerClick(event));
    return this.results;
  }

  handlerClick(event) {
    if (Results.isClickOnButtonReturn(event)) {
      this.transitionResultsToGame();
    }

    if (Results.isClickOnButtonNewGame(event)) {
      this.clickOnButtonNewGame();
    }

    if (this.isClickOnWords(event)) {
      this.clickOnWords();
    }
  }

  getResultsWord(arrayWords) {
    const resultsWord = document.createElement('div');

    this.errorsItem = document.createElement('div');
    this.errorsItem.classList.add('errors-item');

    this.succesItem = document.createElement('div');
    this.succesItem.classList.add('succes-item');
    let countErrors = 0;
    let countSucces = 0;
    for (let i = 0; i < arrayWords.length; i += 1) {
      if (arrayWords[i].isGuess) {
        this.succesItem.append(Results.getItemPesults(arrayWords[i]));
        countSucces += 1;
      } else {
        this.errorsItem.append(Results.getItemPesults(arrayWords[i]));
        countErrors += 1;
      }
    }
    resultsWord.append(this.getCountSucces(countSucces));
    resultsWord.append(this.succesItem);
    resultsWord.append(this.getCountErrors(countErrors));
    resultsWord.append(this.errorsItem);
    return resultsWord;
  }

  static getItemContainer() {
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('item');

    return itemContainer;
  }

  static getSvgAudio() {
    const audioIcon = document.createElement('span');
    audioIcon.classList.add('audio-icon');
    const keyValue = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fill-rule="evenodd"></path></svg>';
    audioIcon.insertAdjacentHTML('beforeend', keyValue);
    return audioIcon;
  }

  static getItemPesults(arrayWords) {
    const itemResults = document.createElement('div');
    itemResults.classList.add('item');
    itemResults.dataset.current = arrayWords.current;
    itemResults.append(Results.getSvgAudio());
    const paragraphWord = document.createElement('p');
    paragraphWord.classList.add('word');
    paragraphWord.innerHTML = arrayWords.word;
    itemResults.append(paragraphWord);
    const paragraphTranscription = document.createElement('p');
    paragraphTranscription.classList.add('transcription');
    paragraphTranscription.innerHTML = arrayWords.transcription;
    itemResults.append(paragraphTranscription);
    const paragraphTranslation = document.createElement('p');
    paragraphTranslation.classList.add('translation');
    paragraphTranslation.innerHTML = arrayWords.translation;
    itemResults.append(paragraphTranslation);

    return itemResults;
  }

  updateResultsWord(arrayWords) {
    let countErrors = 0;
    let countSucces = 0;
    this.succesItem.innerHTML = '';
    this.errorsItem.innerHTML = '';
    for (let i = 0; i < arrayWords.length; i += 1) {
      if (arrayWords[i].isGuess) {
        this.succesItem.append(Results.getItemPesults(arrayWords[i]));
        countSucces += 1;
      } else {
        this.errorsItem.append(Results.getItemPesults(arrayWords[i]));
        countErrors += 1;
      }
    }
    document.querySelector('.succes-num').innerHTML = countSucces;
    document.querySelector('.errors-num').innerHTML = countErrors;
  }

  getCountSucces(countSucces) {
    this.succesContainer = document.createElement('p');
    this.succesContainer.classList.add('succes');
    const nameErrors = 'Знаю';
    const keyValue = `${nameErrors}<span class="succes-num">${countSucces}</span>`;
    this.succesContainer.insertAdjacentHTML('beforeend', keyValue);

    return this.succesContainer;
  }

  getCountErrors(countErrors) {
    this.errorsContainer = document.createElement('p');
    this.errorsContainer.classList.add('errors');
    const nameErrors = 'Ошибок';
    const keyValue = `${nameErrors}<span class="errors-num">${countErrors}</span>`;
    this.errorsContainer.insertAdjacentHTML('beforeend', keyValue);

    return this.errorsContainer;
  }

  static getButtons() {
    const buttons = document.createElement('div');
    buttons.classList.add('btns');
    buttons.classList.add('btns-res');
    const keyValue = '<a href="#" class="btn btn-res return">Return</a><a href="#" class="btn btn-res new-game">New game</a>';
    buttons.insertAdjacentHTML('beforeend', keyValue);
    return buttons;
  }

  isClickOnWords(event) {
    if (!event.target.classList.contains('point')) {
      if (event.target.parentNode.classList.contains('item')) {
        this.wordActive = event.target.parentNode.querySelector('.word').textContent;
        this.translationActive = event.target.parentNode.querySelector('.translation').textContent;
        Results.getActiveItem(event.target.parentNode);
        return true;
      }
      if (event.target.parentNode.parentNode.parentNode.classList.contains('item')) {
        this.wordActive = event.target.parentNode.parentNode.parentNode.querySelector('.word').textContent;
        this.translationActive = event.target.parentNode.parentNode.parentNode.querySelector('.translation').textContent;
        Results.getActiveItem(event.target.parentNode.parentNode.parentNode);
        return true;
      }
      if (event.target.classList.contains('item')) {
        this.wordActive = event.target.querySelector('.word').textContent;
        Results.getActiveItem(event.target);
        return true;
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

  clickOnWords() {
    const result = this.getInfoByWord(this.wordActive);
    this.audioContainer.src = this.src + result[1];
    const playPromise = this.audioContainer.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {})
        .catch(() => {});
    }
  }

  getInfoByWord(word) {
    for (let i = 0; i < this.activeArray.length; i += 1) {
      if (this.activeArray[i].word === word) {
        return [this.activeArray[i].image, this.activeArray[i].audio];
      }
    }
    return false;
  }

  static isClickOnButtonReturn(event) {
    return event.target.classList.contains('return');
  }

  static isClickOnButtonNewGame(event) {
    return event.target.classList.contains('new-game');
  }

  clickOnButtonNewGame() {
    this.transitionResultsToGame();
    this.clickOnButtonRestart();
  }

  hiddenResults() {
    this.results.classList.add('hidden');
  }

  showResults() {
    this.results.classList.remove('hidden');
  }
}
