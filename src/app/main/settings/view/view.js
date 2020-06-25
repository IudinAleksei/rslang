export default function addSettingsHtml() {
  const mainContainer = document.querySelector('.main-container');
  mainContainer.innerHTML = `<div class="settings-select">
    <div class="settings-info" id="settings-info">
      <p class="settings-title">Choose setting</p>
      <div class="wrap__settings__slider-container">
        <div class="settings__slider-container">
          <div class="settings__slider-container__text">
            <p>New words to learn:</p>
          </div>
          <div class="settings__slider-container__input">
            <input class="range-slider__words slider" type="range" id="words-slider" name="" value="1" min="2" max="30">
            <label class="range-value__words slider-value" for="words-slider" id="range-value-new-words">10</label>
          </div>
        </div>
        <div class="settings__slider-container">
          <div class="settings__slider-container__text">
            <p>Max number of Cards:</p>
          </div>
          <div class="settings__slider-container__input">
            <input class="range-slider__cards slider" type="range" id="cards-slider" name="" value="1" min="4" max="40">
            <label class="range-value__cards slider-value" for="cards-slider" id="range-value-cards">4</label>
          </div>
        </div>
      </div>
      <div class="settings-wrapper">
        <div class="settings-wrapper__wrap">
          <div class="settings-container">
            <input class="settings-checkbox" type="checkbox" id="show-answer">
            <label for="show-answer"></label>
            <div class="settings-container__text">
              <p>Show answer</p>
            </div>
          </div>
          <div class="settings-container">
            <input class="settings-checkbox" type="checkbox" id="delete-word">
            <label for="delete-word"></label>
            <div class="settings-container__text">
              <p>Delete Word</p>
            </div>
          </div>
          <div class="settings-container">
            <input class="settings-checkbox" type="checkbox" id="hard-word">
            <label for="hard-word"></label>
            <div class="settings-container__text">
              <p>Hard Word</p>
            </div>
          </div>
          <div class="settings-container">
            <input class="settings-checkbox" type="checkbox" id="transcription">
            <label for="transcription"></label>
            <div class="settings-container__text">
              <p>Transcription</p>
            </div>
          </div>
          <div class="settings-container">
            <input class="settings-checkbox" type="checkbox" id="example" required>
            <label for="example"></label>
            <div class="settings-container__text">
              <p>Example<span>*</span</p>
            </div>
          </div>
        </div>
        <div class="settings-wrapper__wrap">
          <div class="settings-container">
            <input class="settings-checkbox" type="checkbox" id="translation" required checked>
            <label for="translation"></label>
            <div class="settings-container__text">
              <p>Translation<span>*</span</p>
            </div>
          </div>
          <div class="settings-container">
            <input class="settings-checkbox" type="checkbox" id="sentences-translation">
            <label for="sentences-translation"></label>
            <div class="settings-container__text">
              <p>Sentences Translation</p>
            </div>
          </div>
          <div class="settings-container">
            <input class="settings-checkbox" type="checkbox" id="show-picture">
            <label for="show-picture"></label>
            <div class="settings-container__text">
              <p>Show Picture</p>
            </div>
          </div>
          <div class="settings-container">
            <input class="settings-checkbox" type="checkbox" id="explanation" required>
            <label for="explanation"></label>
            <div class="settings-container__text">
              <p>Explanation<span>*</span></p>
            </div>
          </div>
          <div class="settings-container">
            <input class="settings-checkbox" type="checkbox" id="play-audio">
            <label for="play-audio"></label>
            <div class="settings-container__text">
              <p>Play Audio</p>
            </div>
          </div>
        </div>
      </div>
      <p class="settings-important-information">Select one of the required options (<span>*</span>)</p></div>
      <div class="settings__buttons">
        <button class="settings__play-button">PLAY</button>
      </div>
   </div>
  </div>`;
}
