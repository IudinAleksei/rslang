export default class Intro {
  getIntro() {
    this.intro = document.createElement('div');
    this.intro.classList.add('intro');

    let keyValue = '<h1 class="title">SpeakIt</h1>';
    this.intro.insertAdjacentHTML('beforeend', keyValue);
    keyValue = '<p class="intro-text"> Click on the words to hear them sound.<br> Click on the button and speak the words into the microphone.</p>';
    this.intro.insertAdjacentHTML('beforeend', keyValue);
    keyValue = '<a href="#" class="btn intro-btn">Start</a>';
    this.intro.insertAdjacentHTML('beforeend', keyValue);

    this.intro.addEventListener('click', (event) => this.handlerClick(event));

    return this.intro;
  }

  handlerClick(event) {
    if (this.isClickOnIntro(event)) {
      this.clickOnIntro();
    }
  }

  static isClickOnIntro(event) {
    return event.target.classList.contains('intro-btn');
  }

  clickOnIntro() {
    this.intro.classList.add('hidden');
    document.querySelector('.container').classList.remove('hidden');
  }
}
