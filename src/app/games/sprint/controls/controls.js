import { renderGame } from '../view/view';
import sprintGamePageHandling from '../gameLogic';

export default function addEventListenerForStartPage() {
  const startPlay = document.querySelector('.sprint-game__start-button');
  const sliderLevelSprintGame = document.querySelector('.sprint-game__range-slider__level');
  const sliderCounterLevelSprint = document.querySelector('.sprint-game__range-value__level');
  const gameLevel = document.querySelector('#range-value-level');

  function onclickStartPlay() {
    const level = gameLevel.innerHTML;
    console.log(`level >>>> ${level}`);
    startPlay.classList.add('none');
    renderGame();
    sprintGamePageHandling(level);
  }

  function getSliderHandler(element) {
    const slider = element;
    return function assignInnerHtml(event) {
      slider.innerHTML = event.target.value;
    };
  }

  sliderLevelSprintGame.addEventListener('input', getSliderHandler(sliderCounterLevelSprint));
  startPlay.addEventListener('click', onclickStartPlay);
}
