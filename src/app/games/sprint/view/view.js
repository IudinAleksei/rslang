export default function renderGame(elem) {
  // eslint-disable-next-line no-param-reassign
  elem.innerHTML = `<div class="card-container">
    <div class="word-section">
      <div class="question-wrapper">
        <div class="sound-button"></div>
        <div class="points">0</div>
        <div class="sound"></div>
        <div class="progress">
          <div class="circles">
            <div class="circle empty"></div>
            <div class="circle empty"></div>
            <div class="circle empty"></div>
          </div>
          <div class="birds">
            <div class="parrot parrot1 active-parrot"></div>
            <div class="parrot parrot2"></div>
            <div class="parrot parrot3"></div>
            <div class="parrot parrot4"></div>
            <div class="branch"></div>
          </div>
        </div>
        <div class="word">test</div>
        <div class="translation">тест</div>
    </div>
  </div>
    <div class="buttons-section"></div>
  </div>`;
}
