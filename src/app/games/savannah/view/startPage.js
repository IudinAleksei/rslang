import startGame from './startGame';

export default function renderSavannahStartPage() {
  document.querySelector('body').classList.add('savannah__body');
  document.querySelector('.main-container').innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.setAttribute('id', 'savannah');

  const title = document.createElement('div');
  title.classList.add('savannah__title');

  const subtitle = document.createElement('p');
  subtitle.classList.add('savannah-subtitle');
  subtitle.textContent = 'Welcome to savannah game';

  const form = document.createElement('form');
  form.classList.add('select-level__form');

  const choose = document.createElement('p');
  choose.classList.add('choose-level');
  choose.textContent = 'You can choose level';

  const selectLevel = document.createElement('select');
  selectLevel.classList.add('select-level');

  for (let i = 0; i < 6; i += 1) {
    const option = document.createElement('option');
    option.textContent = i;
    selectLevel.append(option);
  }

  const chooseUserWord = document.createElement('p');
  chooseUserWord.textContent = 'or your ';
  chooseUserWord.classList.add('choose-user-word');

  const selectUserWord = document.createElement('span');
  selectUserWord.classList.add('select-user-word');
  selectUserWord.textContent = 'learning words';

  chooseUserWord.append(selectUserWord);

  form.append(choose, selectLevel, chooseUserWord);

  const button = document.createElement('button');
  button.classList.add('savannah__start-button');
  button.textContent = 'Start';

  wrapper.append(title, subtitle, form, button);

  document.querySelector('.main-container').append(wrapper);

  let levelValue = 0;

  selectLevel.onchange = function getLevelValue() {
    levelValue = selectLevel.value;
  };

  button.addEventListener('click', () => {
    wrapper.innerHTML = '';
    startGame(levelValue);
  });
}
