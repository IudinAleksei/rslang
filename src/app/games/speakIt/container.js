export default class Appcontainer {
  constructor() {
    this.complexity = 0;
    this.maxPoint = 6;
    this.activePoint = 0;
    // this.src = 'https://raw.githubusercontent.com/SkaymanT/rslang-data/master/data/';
    this.src = 'https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/';
  }

  render(array) {
    this.appcontainer = document.createElement('div');
    this.appcontainer.classList.add('container');
    this.appcontainer.classList.add('hidden');

    // const resulthContainer = document.createElement('div');
    // resulthContainer.classList.add('res');

    // const pointsContainer = document.createElement('ul');
    // pointsContainer.classList.add('points');
    // resulthContainer.append(pointsContainer);

    // for (let i = 0; i < this.maxPoint; i += 1) {
    //   const pointContainer = document.createElement('li');
    //   pointContainer.classList.add('point');
    //   pointsContainer.append(pointContainer);
    //   if (i === this.activePoint) {
    //     pointContainer.classList.add('activePoint');
    //   }
    // }

    // const scoreContainer = document.createElement('div');
    // scoreContainer.classList.add('score');
    // resulthContainer.append(scoreContainer);

    this.appcontainer.append(this.getHeaderResult());

    let keyValue = '<div class="images"><img class="img" src="./assets/img/speakit/blank.jpg" alt=""> <p class="translation"></p> <input type="text" class="input none" readonly=""> </div>';
    this.appcontainer.insertAdjacentHTML('beforeend', keyValue);

    const items = this.getItems(array);

    this.appcontainer.append(items);
    keyValue = '<div class="btns"><a href="#" class="btn restart">Restart</a><a href="#" class="btn voice user-speach">Speak please</a><a href="#" class="btn result">Results</a></div>';
    this.appcontainer.insertAdjacentHTML('beforeend', keyValue);

    return this.appcontainer;
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
    const resulthContainer = document.createElement('div');
    resulthContainer.classList.add('res');

    const pointsContainer = document.createElement('ul');
    pointsContainer.classList.add('points');
    resulthContainer.append(pointsContainer);

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
    resulthContainer.append(scoreContainer);
    return this.items;
  }
}
