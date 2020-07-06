export default function renderStartPage() {
  const mainContainer = document.querySelector('.main-container');
  mainContainer.innerHTML = `<div class="sprint-game__start-page">
<h1>Welcome to Sprint Game!</h1>
<div class="sprint-game__slider">
          <div class="sprint-game__slider__text">
            <p class="level">Level of difficulty:</p>
          </div>
          <div class="sprint-game__slider__input">
            <input class="sprint-game__range-slider__level sprint-game__range-slider" type="range" id="level-slider" name="" value="0" min="0" max="5">
            <label class="sprint-game__range-value__level sprint-game__slider-value" for="level-slider" id="range-value-level">0</label>
          </div>
</div>
<button class="sprint-game__start-button">Start</button>
<div class="sprint-game__start-page__counter">3</div>
</div>`;
}

export function renderGame() {
  const mainContainer = document.querySelector('.main-container');
  mainContainer.innerHTML = `<div class="card-container">
    <div class="word-section">
      <div class="question-wrapper">
        <div class="sound-button">
        <audio class="word-sound" src=""></audio>
        </div>
        <div class="points">0</div>
        <div class="counter">60</div>
        <div class="sound"></div>
        <div class="progress">
          <div class="circles">
            <div class="circle empty"></div>
            <div class="circle empty"></div>
            <div class="circle empty"></div>
          </div>
          <div><p class="extra-points"></p></div>
          <div class="birds">
            <div class="parrot parrot1 active-parrot"></div>
            <div class="parrot parrot2"></div>
            <div class="parrot parrot3"></div>
            <div class="parrot parrot4"></div>
            <div class="branch"></div>
          </div>
        </div>
        <div class="word"></div>
        <div class="translation"></div>
    </div>
  </div>
    <div class="buttons-section">
      <button class="sprint-game__wrong">Wrong</button>
      <button class="sprint-game__correct">Correct</button>
    </div>
  </div>
  <div class="sprint-game__statistic-block hidden"></div>`;
}

export function renderStatisticModal(correctAnswersStat, inCorrectAnswersStat, points) {
  const statisticBlock = document.querySelector('.sprint-game__statistic-block');
  statisticBlock.innerHTML = `<div class="sprint-game__statistic-info">
    <p class="sprint-game__statistic-info__answers">You got ${correctAnswersStat} correct answers out of 
    ${correctAnswersStat + inCorrectAnswersStat}!</p>
    <p class="sprint-game__statistic-info__points">${points} points!</p>
    <button class="play-again-btn">Play Again</button>
    </div>`;
  statisticBlock.classList.remove('hidden');
}

export async function setCardData(englishWord, russianWord) {
  const word = document.querySelector('.word');
  const translation = document.querySelector('.translation');
  word.innerText = englishWord;
  translation.innerText = russianWord;
}

export function removeCircleClasses(className) {
  const circles = document.querySelectorAll('.circle');
  circles.forEach((el) => {
    el.classList.remove(className);
  });
}
