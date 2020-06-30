export default function showStatistic(paintings, level, page, wordKnow, wordNotKnow) {
  document.querySelector('.puzzle-game__header').style.visibility = 'hidden';
  document.querySelector('.container-game').style.visibility = 'hidden';
  const containerStatistic = document.createElement('div');
  containerStatistic.className = 'container-statistic';
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
  blockKnow.className = 'block-not-know';
  containerStatistic.append(blockKnow);
  const notKnow = document.createElement('div');
  notKnow.innerHTML = `I dont know  <span class="block-not-know__item">${wordNotKnow.length}</span>:`;
  for (let i = 0; i < wordNotKnow.length; i += 1) {
    const w = document.createElement('div');
    w.className = 'sentence';
    w.innerHTML = `<button class="word-statistic-button" data-value='${wordNotKnow[i].audioExample}'></button><p class="word-statistic">${wordNotKnow[i].textExample}</p>`;
    notKnow.append(w);
  }
  blockKnow.append(notKnow);
  const know = document.createElement('div');
  know.className = 'block-know';
  know.innerHTML = `I know  <span class="block-know__item">${wordKnow.length}</span>:`;
  for (let i = 0; i < wordKnow.length; i += 1) {
    const w = document.createElement('p');
    w.className = 'sentence';
    w.innerHTML = `<button class="word-statistic-button" data-value='${wordKnow[i].audioExample}'></button><p class="word-statistic">${wordKnow[i].textExample}</p>`;
    know.append(w);
  }
  blockKnow.append(know);
  const buttonContinue = document.createElement('button');
  buttonContinue.id = 'button-statistic';
  buttonContinue.innerText = 'continue';
  containerStatistic.append(buttonContinue);
}
