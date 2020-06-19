export default class Results {
  constructor() {

  }

  render(array) {
    this.results = document.createElement('div');
    this.results.classList.add('results');
    this.results.classList.add('hidden');
    this.checkSucses(10);

    this.resultContainer = document.createElement('div');
    this.resultContainer.classList.add('results-container');

    this.resultContainer.append(this.getCountErrors());
    this.resultContainer.append(this.getErrors(array));

    this.resultContainer.append(this.getCountSucces());
    this.resultContainer.append(this.getSucces(array));
    this.resultContainer.append(this.getButtons());


    this.results.append(this.resultContainer);
    return this.results;
  }

  checkSucses(countErrors){
    this.countErrors = countErrors;
    this.countSucces = 10 - countErrors;
  }
  getCountErrors() {
    const errorsContainer = document.createElement('p');
    errorsContainer.classList.add('errors');
    let nameErrors = 'Ошибок';
    let keyValue = `${nameErrors}<span class="errors-num">${this.countErrors}</span>`;
    errorsContainer.insertAdjacentHTML('beforeend', keyValue);

    return errorsContainer;
  }

  getErrors(array) {
    this.errorsItem = document.createElement('div');
    this.errorsItem.classList.add('errors-item');
    (async () => {
      const arrayWords = await array;
      console.log(arrayWords.length);
      for (let i = 0; i < this.countErrors; ++i) {
        let keyValue = `<div class="item" data-current="${arrayWords[i].current}"><span class="audio-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fill-rule="evenodd"></path></svg></span><p class="word">${arrayWords[i].word}</p><p class="transcription">${arrayWords[i].transcription}</p><p class="translation">${arrayWords[i].translation}</p></div>`;
        this.errorsItem.insertAdjacentHTML('beforeend', keyValue);
      }
    })();
    return  this.errorsItem;
  }

  getCountSucces() {
    const succesContainer = document.createElement('div');
    let nameSucces = 'Знаю';
    let keyValue = `<p class="succes">${nameSucces}<span class="succes-num">${this.countSucces}</span></p>`;
    succesContainer.insertAdjacentHTML('beforeend', keyValue);

    return succesContainer;
  }

  getSucces(array) {
    this.succesItem = document.createElement('div');
    this.succesItem.classList.add('succes-item');
    (async () => {
      const arrayWords = await array;
      console.log(arrayWords.length);
      for (let i = 0; i < this.countSucces; ++i) {
        let keyValue = `<div class="item" data-current="${arrayWords[i].current}"><span class="audio-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fill-rule="evenodd"></path></svg></span><p class="word">${arrayWords[i].word}</p><p class="transcription">${arrayWords[i].transcription}</p><p class="translation">${arrayWords[i].translation}</p></div>`;
        this.succesItem.insertAdjacentHTML('beforeend', keyValue);
      }
    })();
    return this.succesItem;
  }

  getButtons() {
    const buttons = document.createElement('div');
    let keyValue = '<div class="btns btns-res"><a href="#" class="btn btn-res return">Return</a><a href="#" class="btn btn-res new-game">New game</a></div>';
    buttons.insertAdjacentHTML('beforeend', keyValue);
    return buttons;
  }

  
  clickOnWords() {
    let audio = document.querySelector('.audio');
    let result = this.getInfoByWord(this.wordActive);
  
    audio.setAttribute('src', this.src + result[1]);
    let playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {})
        .catch(() => {});
    }
   

  }

  getInfoByWord(word) {
    let result = [];
    for (let i = 0; i < this.json.length / 2; ++i) {
      if (this.json[i].word == word) {
        result.push(this.json[i].image);
        result.push(this.json[i].audio);
      }
    }
    return result;
  }

}