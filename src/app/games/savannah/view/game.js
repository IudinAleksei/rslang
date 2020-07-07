/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { getWordsInfo, getWordInfoById } from '../../../common/index';
import renderStatistic from './statistic';

export default class Game {
  constructor(randomArray) {
    this.randomArray = randomArray;
    this.wordsArr = [];
    this.level = 1;
    this.life = 5;
    this.statObj = {};
  }

  renderLayout() {
    this.trueWord = document.createElement('div');
    this.trueWord.classList.add('true-word');

    this.list = document.createElement('div');
    this.list.classList.add('savannah-list');

    document.getElementById('savannah').append(this.trueWord, this.list);

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

  async createWordList() {
    this.wordArr = await this.getAlternativeWords();

    for (let i = 0; i < this.wordArr.length; i += 1) {
      const li = document.createElement('li');
      li.classList.add('savannah__list-item');
      li.setAttribute('data-key', i + 1);
      li.textContent = this.wordArr[i];
      if (li.textContent === Object.values(this.wordsArr[0])[0]) {
        li.setAttribute('data-word', Object.values(this.wordsArr[0])[0]);
      }
      this.list.append(li);
    }
  }

  clickHandler(event) {
    if (event.target.dataset.word === Object.values(this.wordsArr[0])[0]) {
      this.level += 1;
      this.statObj[Object.values(this.wordsArr[0])[0]] = true;
    } else {
      this.level += 1;
      this.life -= 1;
      this.statObj[Object.values(this.wordsArr[0])[0]] = false;
    }

    this.wordsArr.splice(0, 1);
    this.list.innerHTML = '';
    this.play();
  }

  async play() {
    if (this.level === 20 || this.life === 0) {
      renderStatistic(this.statObj);
    }

    if (!this.wordsArr.length) {
      this.getWordsObj();
    }

    this.createWordList();

    console.log(Object.values(this.wordsArr[0])[0]);
    console.log(Object.keys(this.wordsArr[0])[0]);
    console.log(this.level);
    console.log(this.life);
    console.log(this.statObj);
  }
}
