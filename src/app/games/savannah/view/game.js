/* eslint-disable import/no-cycle */
import { getWordsInfo, getWordInfoById } from '../../../common/index';
import renderStatistic from './statistic';
import renderSavannahStartPage from './startPage';

export default class Game {
  constructor(wordsArr, loginResponse) {
    this.loginResponse = loginResponse;
    this.wordsArr = wordsArr;
    this.maxLevel = Object.keys(this.wordsArr).length;
    this.level = 1;
    this.life = 5;
    this.statObj = {};
    this.crystalScale = 1;
    this.bg = 0;
    this.statObj.right = 0;
    this.statObj.mistakes = 0;
    this.workAnimation = true;
    this.audioPlay = true;
    this.rightCount = 1;
  }

  renderLayout() {
    this.list = document.createElement('div');
    this.list.classList.add('savannah-list');

    this.audioWrapper = document.createElement('div');
    this.audioWrapper.classList.add('savannah__audio__wrapper');

    this.heartWrapper = document.createElement('div');
    this.heartWrapper.classList.add('heart__wrapper');

    this.heartList = document.createElement('ul');
    this.heartList.classList.add('heart__list');

    for (let i = 0; i < 5; i += 1) {
      this.heartItem = document.createElement('li');
      this.heartItem.classList.add('heart__list-item', `${i}`);
      this.heartList.append(this.heartItem);
    }

    this.heartWrapper.append(this.heartList);

    this.crystal = document.createElement('div');
    this.crystal.classList.add('crystal__wrapper');

    this.crystalImage = document.createElement('img');
    this.crystalImage.classList.add('crystal__image');
    this.crystalImage.src = './assets/icons/savannah/crystal.png';

    this.crystal.append(this.crystalImage);

    document.getElementById('savannah').append(this.audioWrapper, this.heartWrapper, this.list, this.crystal);

    this.list.addEventListener('click', (event) => this.clickHandler(event));

    this.audioWrapper.addEventListener('click', () => this.isPlayAudio());
  }

  shuffle(array) {
    const shuffledArray = array;
    let currentIndex = shuffledArray.length;
    let temporaryValue;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      shuffledArray[currentIndex] = array[randomIndex];
      shuffledArray[randomIndex] = temporaryValue;
    }

    this.test = 1;

    return shuffledArray;
  }

  async getAlternativeWords() {
    this.alternateArr = await getWordsInfo(Object.keys(this.wordsArr[0]));
    this.meanings = this.alternateArr[0].meanings;
    this.id = 0;
    this.meanings.map((el, i) => {
      if (el.translation.text === Object.values(this.wordsArr[0])[0]) {
        this.id = el.id;
      } else if (i === 0) {
        this.id = el.id;
      }

      return el;
    });

    this.infoById = await getWordInfoById(this.id);
    this.alternativeWords = this.infoById[0].alternativeTranslations;
    this.filterArr = this.alternativeWords.filter((el) => !(/\s+/).test(el.translation.text));

    this.newArr = [];
    this.filterArr.map((el) => this.newArr.push(el.translation.text));
    this.shuffleArr = this.shuffle(this.newArr);
    this.sliceArr = this.shuffleArr.slice(0, 3);
    this.sliceArr.push(Object.values(this.wordsArr[0])[0]);

    this.wordList = this.shuffle(this.sliceArr);

    return this.wordList;
  }

  createRightWord() {
    this.trueWordContainer = document.createElement('div');
    this.trueWordContainer.classList.add('savannah__true-word__container');

    this.trueWord = document.createElement('div');
    this.trueWord.classList.add('savannah__true-word');

    this.trueWordContainer.append(this.trueWord);

    this.trueWord.append(Object.keys(this.wordsArr[0]));

    document.getElementById('savannah').append(this.trueWordContainer);
  }

  async createWordList() {
    this.wordArr = await this.getAlternativeWords();

    this.ol = document.createElement('ol');
    this.ol.classList.add('word-list');
    this.ol.innerHTML = '';

    for (let i = 0; i < this.wordArr.length; i += 1) {
      const li = document.createElement('li');
      li.classList.add('savannah__list-item');
      li.setAttribute('data-key', i + 1);
      li.textContent = this.wordArr[i];
      if (li.textContent === Object.values(this.wordsArr[0])[0]) {
        li.setAttribute('data-word', Object.values(this.wordsArr[0])[0]);
      } else {
        li.setAttribute('data-falseword', 'true');
      }
      li.setAttribute('data-key', i + 1);

      this.ol.append(li);
    }

    this.list.append(this.ol);
  }

  playAudio(src) {
    this.audioElement = new Audio(src);
    this.audioElement.play();
  }

  isPlayAudio() {
    if (this.audioPlay) {
      this.audioPlay = false;
      this.audioWrapper.classList.add('savannah__audio__wrapper_off');
    } else if (!this.audioPlay && this.audioWrapper.classList.contains('savannah__audio__wrapper_off')) {
      this.audioPlay = true;
      this.audioWrapper.classList.remove('savannah__audio__wrapper_off');
    }
  }

  animationWord() {
    if (document.querySelector('.savannah__true-word').classList.contains('savannah__true-word_right')) {
      document.querySelector('.savannah__true-word').classList.remove('savannah__true-word_right');
    } else if (document.querySelector('.savannah__true-word').classList.contains('savannah__true-word_false')) {
      document.querySelector('.savannah__true-word').classList.remove('savannah__true-word_false');
    }

    document.querySelector('.savannah__true-word').classList.remove('savannah__true-word_fall');
    document.querySelector('.savannah__true-word').classList.add('savannah__true-word_fall');

    this.timeout = setTimeout(() => {
      document.querySelector('.savannah__true-word').classList.add('savannah__true-word_false');
      this.level += 1;
      this.life -= 1;
      this.statObj.mistakes += 1;
      this.statObj[Object.values(this.wordsArr[0])[0]] = false;
      document.querySelector('.heart__list-item').remove();

      this.wordsArr.splice(0, 1);

      if (this.audioPlay) {
        this.playAudio('./assets/audio/savannah/savannah-wrong-word.mp3');
      }

      const rightWord = document.querySelector('[data-word]');
      rightWord.classList.add('savannah__right-word');

      setTimeout(() => {
        this.list.innerHTML = '';
        this.trueWordContainer.remove();
        this.play();

        if (this.workAnimation) {
          this.workAnimation = false;
        } else {
          this.workAnimation = true;
        }

        this.rightCount = 1;
      }, 300);
    }, 5000);
  }

  rightWordChoose(event) {
    if (this.audioPlay) {
      this.playAudio('./assets/audio/savannah/savannah-right-word.mp3');
    }

    this.bg += 5;
    event.target.classList.add('savannah__right-word');
    document.querySelector('.savannah__true-word').textContent = '';
    document.querySelector('.savannah__true-word').classList.add('savannah__true-word_right');
    document.querySelector('.savannah__body').style.backgroundPosition = `bottom ${this.bg}% right 50%`;

    if (this.rightCount % 3 === 0) {
      this.playAudio('./assets/audio/savannah/savannah-crystal-scale.mp3');
      this.crystalScale += 0.1;
      this.crystalImage.style.transform = '';
      this.crystalImage.style.transform = `scale(${this.crystalScale})`;
    }

    this.level += 1;
    this.rightCount += 1;
    this.statObj.right += 1;
    this.statObj[Object.values(this.wordsArr[0])[0]] = true;

    this.wordsArr.splice(0, 1);

    setTimeout(() => {
      this.list.innerHTML = '';
      this.trueWordContainer.remove();
      this.play();
    }, 500);
  }

  wrongWordChoose(event) {
    if (this.audioPlay) {
      this.playAudio('./assets/audio/savannah/savannah-wrong-word.mp3');
    }

    document.querySelector('.savannah__true-word').classList.add('savannah__true-word_false');
    event.target.classList.add('savannah__wrong-word');

    setTimeout(() => document.querySelector('[data-word]').classList.add('savannah__right-word'), 100);
    this.level += 1;
    this.life -= 1;
    this.rightCount = 1;
    this.statObj.mistakes += 1;
    this.statObj[Object.values(this.wordsArr[0])[0]] = false;
    document.querySelector('.heart__list-item').remove();

    this.wordsArr.splice(0, 1);

    setTimeout(() => {
      this.list.innerHTML = '';
      this.trueWordContainer.remove();
      this.play();
    }, 300);
  }

  clickHandler(event) {
    clearTimeout(this.timeout);

    if (this.workAnimation) {
      this.workAnimation = false;
    } else {
      this.workAnimation = true;
    }

    if (event.target.dataset.word === Object.values(this.wordsArr[0])[0]) {
      this.rightWordChoose(event);
    } else if (event.target.dataset.falseword === 'true') {
      this.wrongWordChoose(event);
    }
  }

  keyboardRightWord(element) {
    if (this.audioPlay) {
      this.playAudio('./assets/audio/savannah/savannah-right-word.mp3');
    }

    this.bg += 5;
    element.classList.add('savannah__right-word');
    document.querySelector('.savannah__true-word').textContent = '';
    document.querySelector('.savannah__true-word').classList.add('savannah__true-word_right');
    document.querySelector('.savannah__body').style.backgroundPosition = `bottom ${this.bg}% right 50%`;

    if (this.rightCount % 3 === 0) {
      this.playAudio('./assets/audio/savannah/savannah-crystal-scale.mp3');
      this.crystalScale += 0.1;
      this.crystalImage.style.transform = '';
      this.crystalImage.style.transform = `scale(${this.crystalScale})`;
    }

    this.level += 1;
    this.rightCount += 1;
    this.statObj.right += 1;
    this.statObj[Object.values(this.wordsArr[0])[0]] = true;

    this.wordsArr.splice(0, 1);

    setTimeout(() => {
      this.list.innerHTML = '';
      this.trueWordContainer.remove();
      this.play();
    }, 500);
  }

  keyboardWrongWord(element) {
    const rightWord = document.querySelector('[data-word]');

    if (this.audioPlay) {
      this.playAudio('./assets/audio/savannah/savannah-wrong-word.mp3');
    }

    document.querySelector('.savannah__true-word').classList.add('savannah__true-word_false');
    element.classList.add('savannah__wrong-word');

    setTimeout(() => rightWord.classList.add('savannah__right-word'), 100);

    this.level += 1;
    this.life -= 1;
    this.rightCount = 1;
    this.statObj.mistakes += 1;
    this.statObj[Object.values(this.wordsArr[0])[0]] = false;
    document.querySelector('.heart__list-item').remove();

    this.wordsArr.splice(0, 1);

    setTimeout(() => {
      this.list.innerHTML = '';
      this.trueWordContainer.remove();
      this.play();
    }, 300);
  }

  keyboardHandler(event) {
    this.workAnimation = true;

    if (event.code === 'Digit1' || event.code === 'Digit2' || event.code === 'Digit3' || event.code === 'Digit4' || event.code === 'Numpad1' || event.code === 'Numpad2' || event.code === 'Numpad3' || event.code === 'Numpad4') {
      clearTimeout(this.timeout);

      const element = document.querySelector(`[data-key="${event.key}"]`);
      const elementDataWord = element.dataset.falseword;

      if (elementDataWord !== 'true') {
        this.keyboardRightWord(element);
      } else if (elementDataWord === 'true') {
        this.keyboardWrongWord(element);
      }
    } else if (event.code === 'Enter') {
      if (document.querySelector('.savannah__stat__button')) {
        renderSavannahStartPage(this.loginResponse);
      }
    }
  }

  async play() {
    if (this.level === this.maxLevel || this.life <= 0) {
      if (this.audioPlay) {
        this.playAudio('./assets/audio/savannah/savannah-statistic.mp3');
      }

      renderStatistic(this.statObj, this.loginResponse);
    } else {
      this.createRightWord();

      await this.createWordList();

      this.animationWord();
    }

    if (this.workAnimation) {
      document.addEventListener('keydown', (event) => this.keyboardHandler(event), { once: true });
    }
  }
}
