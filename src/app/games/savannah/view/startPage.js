/* eslint-disable import/no-cycle */
import '../sass/main.scss';
import { setLocalData, getAndInitLocalData } from '../../../common/index';
import getWordsArray from './getWordsArray';
import preload from './preload';

export default async function renderSavannahStartPage(loginResponse) {
  document.querySelector('body').classList.add('savannah__body');
  document.querySelector('.savannah__body').style.backgroundPosition = 'bottom right 50%';
  document.querySelector('.main-container').innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.setAttribute('id', 'savannah');

  const title = document.createElement('h1');
  title.classList.add('savannah__title');
  title.textContent = 'Savannah';

  const subtitle = document.createElement('p');
  subtitle.classList.add('savannah-subtitle');
  subtitle.textContent = 'Savannah game increase your vocabulary';

  const form = document.createElement('form');
  form.classList.add('select-level__form');

  const choose = document.createElement('p');
  choose.classList.add('choose-level');
  choose.textContent = 'You can choose level';

  const selectLevel = document.createElement('select');
  selectLevel.classList.add('select-level');

  for (let i = 1; i <= 6; i += 1) {
    const option = document.createElement('option');
    option.textContent = i;
    selectLevel.append(option);
  }

  const chooseUserWord = document.createElement('p');
  chooseUserWord.textContent = 'or your ';
  chooseUserWord.classList.add('choose-user-word');

  const selectUserWord = document.createElement('span');
  selectUserWord.classList.add('savannah__select-user-word');
  selectUserWord.textContent = 'learning words';

  chooseUserWord.append(selectUserWord);

  form.append(choose, selectLevel, chooseUserWord);

  const button = document.createElement('button');
  button.classList.add('savannah__start-button');
  button.textContent = 'Start';

  wrapper.append(title, subtitle, form, button);

  document.querySelector('.main-container').append(wrapper);

  let levelValue = getAndInitLocalData().savannahLevel;

  let wordsArr = [];

  selectLevel.onchange = async function getLevelValue() {
    levelValue = selectLevel.value;
    wordsArr = await getWordsArray(loginResponse, levelValue);
    button.removeAttribute('disabled');
  };

  selectUserWord.addEventListener('click', async () => {
    wordsArr = await getWordsArray(loginResponse, false);

    if (wordsArr.length < 5) {
      alert('Sorry, you have less than 5 words in your vocabulary.\nPlease, choose level!');
      wordsArr = await getWordsArray(loginResponse, levelValue);
    } else {
      selectUserWord.classList.add('savannah__select-user-word_select');
    }
  });

  wordsArr = await getWordsArray(loginResponse, levelValue);

  button.addEventListener('click', async () => {
    wrapper.innerHTML = '';

    setLocalData({ savannahLevel: levelValue });

    preload(wordsArr, loginResponse);
  }, { once: true });

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      if (document.querySelector('.savannah__start-button')) {
        document.querySelector('#savannah').innerHTML = '';

        setLocalData({ savannahLevel: levelValue });

        preload(wordsArr, loginResponse);
      }
    }
  }, { once: true });
}
