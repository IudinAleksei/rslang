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
  }

  renderLayout() {
    this.trueWordContainer = document.createElement('div');
    this.trueWordContainer.classList.add('savannah__true-word__container');

    this.trueWord = document.createElement('div');
    this.trueWord.classList.add('savannah__true-word');

    this.list = document.createElement('div');
    this.list.classList.add('savannah-list');

    this.trueWordContainer.append(this.trueWord);

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

    document.getElementById('savannah').append(this.trueWordContainer, this.heartWrapper, this.list);

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
    this.trueWord.innerHTML = '';

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
    this.trueWord.append(Object.keys(this.wordsArr[0]));
  }

  animationWord() {
    this.start = Date.now();

    function draw(timePassed) {
      document.querySelector('.savannah__true-word').style.transform = `translate(-50%, ${timePassed / 100}vh)`;
      document.querySelector('.savannah__true-word').classList.add('savannah__true-word_fall');
    }

    this.timer = setInterval(() => {
      const timePassed = Date.now() - this.start;

      if (timePassed >= 5000) {
        clearInterval(this.timer);

        this.level += 1;
        this.life -= 1;
        this.statObj[Object.values(this.wordsArr[0])[0]] = false;
        this.wordsArr.splice(0, 1);
        this.list.innerHTML = '';
        document.querySelector('.savannah__true-word').classList.remove('savannah__true-word_fall');
        document.querySelector('.heart__list-item').remove();

        if (this.level === this.wordsArr.length || this.life === 0) {
          renderStatistic(this.statObj);
        } else {
          this.play();
        }

        return;
      }

      draw(timePassed);
    }, 10);
  }

  clickHandler(event) {
    if (event.target.dataset.word === Object.values(this.wordsArr[0])[0]) {
      this.level += 1;
      this.statObj[Object.values(this.wordsArr[0])[0]] = true;
    } else {
      this.level += 1;
      this.life -= 1;
      this.statObj[Object.values(this.wordsArr[0])[0]] = false;
      document.querySelector('.heart__list-item').remove();
    }

    clearInterval(this.timer);
    this.wordsArr.splice(0, 1);
    this.list.innerHTML = '';
    this.play();
  }

  async play() {
    if (!this.wordsArr.length) {
      this.getWordsObj();
    }

    await this.createWordList();

    if (this.level === this.wordsArr.length || this.life === 0) {
      clearInterval(this.timer);
      renderStatistic(this.statObj);
    }

    this.animationWord();

    console.log(Object.values(this.wordsArr[0])[0]);
    console.log(Object.keys(this.wordsArr[0])[0]);
    console.log(this.level);
    console.log(this.life);
    console.log(this.statObj);
    console.log(this.wordsArr);
  }
}
