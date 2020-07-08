/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { getWordsInfo, getWordInfoById } from '../../../common/index';
import renderStatistic from './statistic';

export default class Game {
  constructor(randomArray) {
    this.randomArray = randomArray;
    this.wordsArr = [];
    this.level = 0;
    this.life = 5;
    this.statObj = {};
    this.crystalScale = 1;
    this.bg = 0;
  }

  renderLayout() {
    this.list = document.createElement('div');
    this.list.classList.add('savannah-list');

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
    this.crystalImage.src = '/assets/icons/savannah/crystal.png';

    this.crystal.append(this.crystalImage);

    document.getElementById('savannah').append(this.heartWrapper, this.list, this.crystal);

    this.list.addEventListener('click', (event) => this.clickHandler(event));

    return this.list;
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    this.test = 1;

    return array;
  }

  getWordsObj() {
    this.randomArray.map((el) => {
      this.wordsArr.push({ [el.word]: el.wordTranslate });
      return el;
    });
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
      }
      this.ol.append(li);
    }

    this.list.append(this.ol);
  }

  animationWord() {
    if (document.querySelector('.savannah__true-word').classList.contains('savannah__true-word_right')) {
      document.querySelector('.savannah__true-word').classList.remove('savannah__true-word_right');
    } else if (document.querySelector('.savannah__true-word').classList.contains('savannah__true-word_false')) {
      document.querySelector('.savannah__true-word').classList.remove('savannah__true-word_false');
    }

    document.querySelector('.savannah__true-word').classList.remove('savannah__true-word_fall');
    document.querySelector('.savannah__true-word').classList.add('savannah__true-word_fall');

    return this;
  }

  clickHandler(event) {
    if (event.target.dataset.word === Object.values(this.wordsArr[0])[0]) {
      this.bg += 5;
      document.querySelector('.savannah__true-word').textContent = '';
      document.querySelector('.savannah__true-word').classList.add('savannah__true-word_right');
      document.querySelector('.savannah__body').style.backgroundPosition = `bottom ${this.bg}% right 50%`;
      this.crystalScale += 0.1;
      this.crystalImage.style.transform = '';
      this.crystalImage.style.transform = `scale(${this.crystalScale})`;
      this.level += 1;
      this.statObj[Object.values(this.wordsArr[0])[0]] = true;
    } else {
      document.querySelector('.savannah__true-word').classList.add('savannah__true-word_false');
      this.level += 1;
      this.life -= 1;
      this.statObj[Object.values(this.wordsArr[0])[0]] = false;
      document.querySelector('.heart__list-item').remove();
    }
    this.wordsArr.splice(0, 1);

    setTimeout(() => {
      this.list.innerHTML = '';
      this.trueWordContainer.remove();
      this.play();
    }, 500);
  }

  async play() {
    if (!this.wordsArr.length) {
      this.getWordsObj();
    }

    this.createRightWord();

    await this.createWordList();

    if (this.level === this.wordsArr.length || this.life === 0) {
      renderStatistic(this.statObj);
    } else {
      this.animationWord();
    }

    console.log(Object.values(this.wordsArr[0])[0]);
    console.log(Object.keys(this.wordsArr[0])[0]);
    console.log(this.level);
    console.log(this.life);
    console.log(this.wordsArr);
  }
}
