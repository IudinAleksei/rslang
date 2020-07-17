export default function createStatistic(obj) {
  const { right, mistakes, dontKnow } = obj;

  document.querySelector(('#audiochallenge')).innerHTML = '';

  const stat = document.createElement('div');
  stat.classList.add('audiochallenge__statistic');

  const guessed = document.createElement('div');
  guessed.classList.add('audiochallenge__guessed-words');

  const guessedTitle = document.createElement('h3');
  guessedTitle.classList.add('audiochallenge__guessed-word__title');
  guessedTitle.textContent = `Guessed ${right}:`;

  const mistake = document.createElement('div');
  mistake.classList.add('audiochallenge__mistake-words');

  const mistakesTitle = document.createElement('h3');
  mistakesTitle.classList.add('audiochallenge__mistake-word__title');
  mistakesTitle.textContent = `Mistakes ${mistakes}:`;

  const dunno = document.createElement('div');
  dunno.classList.add('audiochallenge__dont-know-words');

  const dontKnowTitle = document.createElement('h3');
  dontKnowTitle.classList.add('audiochallenge__dont-know-word__title');
  dontKnowTitle.textContent = `Don't know ${dontKnow}:`;

  const guessedList = document.createElement('ul');
  guessedList.classList.add('audiochallenge__guessed-list');

  const mistakesList = document.createElement('ul');
  mistakesList.classList.add('audiochallenge__mistake-list');

  const dontKnowList = document.createElement('ul');
  dontKnowList.classList.add('audiochallenge__dont-know-list');

  const objKey = Object.keys(obj);

  objKey.map((el) => {
    if (obj[el] === true) {
      const guessedListItem = document.createElement('li');
      guessedListItem.classList.add('audiochallenge__guessed-list__item');
      guessedListItem.textContent = el;
      guessedList.append(guessedListItem);
    } else if (obj[el] === false) {
      const mistakesListItem = document.createElement('li');
      mistakesListItem.classList.add('audiochallenge__mistakes-list__item');
      mistakesListItem.textContent = el;
      mistakesList.append(mistakesListItem);
    } else if (obj[el] === 'dontKnow') {
      const dontKnowListItem = document.createElement('li');
      dontKnowListItem.classList.add('audiochallenge__dont-know-list__item');
      dontKnowListItem.textContent = el;
      dontKnowList.append(dontKnowListItem);
    }

    return el;
  });

  guessed.append(guessedTitle, guessedList);
  mistake.append(mistakesTitle, mistakesList);
  dunno.append(dontKnowTitle, dontKnowList);

  const statWrapper = document.createElement('div');
  statWrapper.classList.add('audiochallenge__stat__wrapper');
  statWrapper.append(guessed, mistake, dunno);

  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('audiochallenge__button__wrapper');

  const againButton = document.createElement('button');
  againButton.classList.add('button', 'audiochallenge__button-again');
  againButton.textContent = 'Play again';

  buttonWrapper.append(againButton);

  stat.append(statWrapper, buttonWrapper);
  document.querySelector(('#audiochallenge')).append(stat);
}
