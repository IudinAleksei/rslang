export default function renderGame() {
  const mainContainer = document.querySelector('.main-container');
  mainContainer.innerHTML = `<div class="card-container">
    <div class="word-section">
      <div class="question-wrapper">
        <div class="sound-button">
        <audio class="word-sound" src=""></audio>
        </div>
        <div class="points">0</div>
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
  </div>`;
}
