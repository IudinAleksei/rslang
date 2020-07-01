export default function showStartPuzzleGame() {
  document.querySelector('.main-container').classList.add('puzzle-game__main-container');
  document.querySelector('.main-container').innerHTML = '';
  document.querySelector('body').classList.remove('authorization-form__body__background');
  document.querySelector('.main-container').classList.remove('main-container__form');
  document.querySelector('body').classList.add('puzzle-game__background');
  const wrapperStartPuzzle = document.createElement('div');
  wrapperStartPuzzle.className = 'puzzle-start-game__wrapper';
  document.querySelector('.main-container').append(wrapperStartPuzzle);
  const puzzleStartH1 = document.createElement('h1');
  puzzleStartH1.className = 'puzzle-start-game__heading';
  puzzleStartH1.innerText = 'ENGLISH PUZZLE';
  wrapperStartPuzzle.append(puzzleStartH1);
  const puzzleStartP = document.createElement('p');
  puzzleStartP.className = 'puzzle-start-game__description';
  puzzleStartP.innerText = 'Click on words,collect phrases.Words can be drag and drop. Select in the menu';
  wrapperStartPuzzle.append(puzzleStartP);
  const startPuzzleGame = document.createElement('button');
  startPuzzleGame.className = 'puzzle-start-game__button';
  startPuzzleGame.innerText = 'Start';
  wrapperStartPuzzle.append(startPuzzleGame);
}
