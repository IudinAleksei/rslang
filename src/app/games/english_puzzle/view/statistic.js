export default function showStatistic(paintings, level, page, wordKnow, wordNotKnow) {
  document.querySelector('.puzzle-game__header').style.visibility = 'hidden';
  document.querySelector('.puzzle-game__container-game').style.visibility = 'hidden';
  const containerStatistic = document.createElement('div');
  containerStatistic.className = 'puzzle-game__container-statistic';
  document.querySelector('.main-container').append(containerStatistic);
  const picture = document.createElement('img');
  picture.className = 'picture';
  picture.src = `https://raw.githubusercontent.com/cup0ra/rslang_data_paintings/master/${paintings[level][page].imageSrc}`;
  picture.width = '150';
  picture.height = '90';
  containerStatistic.append(picture);
  const pictureName = document.createElement('p');
  pictureName.className = 'puzzle-game__picture-name';
  pictureName.innerText = `${paintings[level][page].author} - ${paintings[level][page].name}(${paintings[level][page].year})`;
  containerStatistic.append(pictureName);
  const blockKnow = document.createElement('div');
  containerStatistic.append(blockKnow);
  const notKnow = document.createElement('div');
  notKnow.className = 'puzzle-game__block-not-know';
  notKnow.innerHTML = `I dont know  <span class="puzzle-game__block-not-know__item">${wordNotKnow.length}</span>:`;
  for (let i = 0; i < wordNotKnow.length; i += 1) {
    const word = document.createElement('div');
    word.className = 'puzzle-game__sentence';
    word.innerHTML = `<button class="puzzle-game__word-statistic-button" data-value='${wordNotKnow[i].audioExample}'></button><p class="puzzle-game__word-statistic">${wordNotKnow[i].textExample}</p>`;
    notKnow.append(word);
  }
  blockKnow.append(notKnow);
  const know = document.createElement('div');
  know.className = 'puzzle-game__block-know';
  know.innerHTML = `I know  <span class="puzzle-game__block-know__item">${wordKnow.length}</span>:`;
  for (let i = 0; i < wordKnow.length; i += 1) {
    const word = document.createElement('p');
    word.className = 'puzzle-game__sentence';
    word.innerHTML = `<button class="puzzle-game__word-statistic-button" data-value='${wordKnow[i].audioExample}'></button><p class="puzzle-game__word-statistic">${wordKnow[i].textExample}</p>`;
    know.append(word);
  }
  blockKnow.append(know);
  const buttonContinue = document.createElement('button');
  buttonContinue.id = 'button-statistic';
  buttonContinue.innerText = 'Continue';
  containerStatistic.append(buttonContinue);
}
