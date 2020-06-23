export default function showGamePage() {
  const header = document.createElement('div');
  header.className = 'puzzle-game__header';
  document.querySelector('.main-container').append(header);
  const controlPanel = document.createElement('div');
  controlPanel.className = 'control-panel';
  const levels = document.createElement('p');
  levels.innerText = 'Level';
  controlPanel.append(levels);
  const selectLevel = document.createElement('select');
  selectLevel.id = 'level';
  selectLevel.className = 'level';
  for (let i = 0; i < 6; i += 1) {
    const optionLevel = document.createElement('option');
    optionLevel.innerText = i + 1;
    selectLevel.append(optionLevel);
  }
  controlPanel.append(selectLevel);
  const pages = document.createElement('p');
  pages.innerText = 'Page';
  controlPanel.append(pages);
  const selectPage = document.createElement('select');
  selectPage.id = 'page';
  selectPage.className = 'page';
  for (let i = 0; i < 45; i += 1) {
    const optionPage = document.createElement('option');
    optionPage.innerText = i + 1;
    selectPage.append(optionPage);
  }

  controlPanel.append(selectPage);
  header.append(controlPanel);

  const hintBlock = document.createElement('div');
  hintBlock.className = ' hint-block';
  const hint1 = document.createElement('button');
  hint1.id = 'hint1';
  hint1.className = 'hint1';
  hintBlock.append(hint1);
  const hint2 = document.createElement('button');
  hint2.id = 'hint2';
  hint2.className = 'hint2';
  hintBlock.append(hint2);
  const hint3 = document.createElement('button');
  hint3.id = 'hint3';
  hint3.className = 'hint3 active';
  hintBlock.append(hint3);
  const hint4 = document.createElement('button');
  hint4.id = 'hint4';
  hint4.className = 'hint4';
  hintBlock.append(hint4);
  header.append(hintBlock);

  const container = document.createElement('div');
  container.className = 'container-game';
  document.querySelector('.main-container').append(container);
  container.innerHTML = '<div class="container-puzzle"><div class="translate"><div class="translate-text"></div></div><div class="block-puzzle"></div><div id="text" class="text" draggable="true"></div><div class="buttons-puzzle"><button id="know">I dont know</button><button id="check">Check</button><button id="continue">Continue</button><button id="results">Results</button></div></div>';
}
