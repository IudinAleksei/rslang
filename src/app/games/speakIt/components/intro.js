export default class Intro {
  constructor(transitionIntroToGame) {
    this.transitionIntroToGame = transitionIntroToGame;
  }

  getIntro() {
    this.intro = document.createElement('div');
    this.intro.classList.add('intro');

    const titleContainer = document.createElement('h1');
    titleContainer.classList.add('title');
    titleContainer.innerHTML = 'SpeakIt';
    this.intro.append(titleContainer);

    const paragraphContainer = document.createElement('p');
    paragraphContainer.classList.add('intro-text');
    paragraphContainer.innerHTML = 'Click on the words to hear them sound.<br> Click on the button and speak the words into the microphone.';
    this.intro.append(paragraphContainer);

    const buttonContainer = document.createElement('button');
    buttonContainer.classList.add('intro-btn');
    buttonContainer.classList.add('btn');
    buttonContainer.innerHTML = 'Start';
    this.intro.append(buttonContainer);

    this.intro.addEventListener('click', (event) => this.handlerClick(event));

    return this.intro;
  }

  handlerClick(event) {
    if (Intro.isClickOnIntro(event)) {
      this.transitionIntroToGame();
    }
  }

  static isClickOnIntro(event) {
    return event.target.classList.contains('intro-btn');
  }

  hiddenIntro() {
    this.intro.classList.add('hidden');
  }
}
