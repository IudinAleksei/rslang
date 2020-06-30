export default function showGamePage(paintings, level) {
  const header = document.createElement('div');
  header.className = 'puzzle-game__header';
  document.querySelector('.main-container').append(header);
  const controlPanel = document.createElement('div');
  controlPanel.className = 'puzzle-game__control-panel';
  const levels = document.createElement('p');
  levels.innerText = 'Level';
  controlPanel.append(levels);
  const selectLevel = document.createElement('select');
  selectLevel.id = 'level';
  selectLevel.className = 'puzzle-game__level';
  for (let i = 0; i < 6; i += 1) {
    const optionLevel = document.createElement('option');
    optionLevel.value = i;
    optionLevel.innerText = i + 1;
    selectLevel.append(optionLevel);
  }
  controlPanel.append(selectLevel);
  const pages = document.createElement('p');
  pages.innerText = 'Page';
  controlPanel.append(pages);
  const selectPage = document.createElement('select');
  selectPage.id = 'page';
  selectPage.className = 'puzzle-game__page';
  for (let i = 0; i < paintings[level].length; i += 1) {
    const optionPage = document.createElement('option');
    optionPage.value = i;
    optionPage.innerText = i + 1;
    selectPage.append(optionPage);
  }

  controlPanel.append(selectPage);
  header.append(controlPanel);

  const hintBlock = document.createElement('div');
  hintBlock.className = 'puzzle-game__hint-block';
  const hint1 = document.createElement('button');
  hint1.id = 'hint1';
  hint1.className = 'puzzle-game__hint-block__hint1';
  hintBlock.append(hint1);
  const hint2 = document.createElement('button');
  hint2.id = 'hint2';
  hint2.className = 'puzzle-game__hint-block__hint2';
  hintBlock.append(hint2);
  const hint3 = document.createElement('button');
  hint3.id = 'hint3';
  hint3.className = 'puzzle-game__hint-block__hint3';
  hintBlock.append(hint3);
  const hint4 = document.createElement('button');
  hint4.id = 'hint4';
  hint4.className = 'puzzle-game__hint-block__hint4';
  hintBlock.append(hint4);
  header.append(hintBlock);

  const container = document.createElement('div');
  container.className = 'puzzle-game__container-game';
  document.querySelector('.main-container').append(container);
  container.innerHTML = '<div class="puzzle-game__container-puzzle"><div class="puzzle-game__translate"><div class="puzzle-game__translate-text"></div></div><div class="puzzle-game__block-puzzle"></div><div id="text" class="puzzle-game__text" data-id="text"></div><div class="buttons-puzzle"><button id="know">I dont know</button><button id="check">Check</button><button id="continue">Continue</button><button id="results">Results</button></div></div>';
  if (localStorage.getItem('puzzleLevel')) {
    const savedValue = localStorage.getItem('puzzleLevel');
    const option = document.querySelector(`#level > option[value="${+savedValue}"]`);
    if (option) {
      option.selected = true;
    }
  }
  if (localStorage.getItem('puzzlePage')) {
    const savedValue = localStorage.getItem('puzzlePage');
    const option = document.querySelector(`#page > option[value="${+savedValue}"]`);
    if (option) {
      option.selected = true;
    }
  }
}
