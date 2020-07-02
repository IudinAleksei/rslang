import { renderGame } from '../view/view';
import sprintGamePageHandling from '../gameLogic';

export default function addEventListenerForStartPage() {
  const startPlay = document.querySelector('.sprint-game__start-button');
  const sliderLevelSprintGame = document.querySelector('.sprint-game__range-slider__level');
  const sliderCounterLevelSprint = document.querySelector('.sprint-game__range-value__level');
  const gameLevel = document.querySelector('#range-value-level');
  const startCounter = document.querySelector('.sprint-game__start-page__counter');

  function onclickStartPlay() {
    const level = gameLevel.innerHTML;
    let seconds = 3;
    startPlay.style.display = 'none';
    startCounter.style.display = 'inline-block';
    setInterval(() => {
      seconds -= 1;
      if (seconds > 0) {
        startCounter.innerHTML = seconds;
      } else if (seconds === 0) {
        startPlay.classList.add('none');
        renderGame();
        sprintGamePageHandling(level);
      }
    }, 1000);
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
