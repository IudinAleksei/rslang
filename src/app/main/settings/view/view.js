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
            <input class="range-slider__words slider" type="range" id="words-slider" name="" value="10" min="2" max="25">
            <label class="range-value__words slider-value" for="words-slider" id="range-value-new-words">10</label>
          </div>
        </div>
        <div class="settings__slider-container">
          <div class="settings__slider-container__text">
            <p>Max number of Cards:</p>
          </div>
          <div class="settings__slider-container__input">
            <input class="range-slider__cards slider" type="range" id="cards-slider" name="" value="20" min="4" max="50">
            <label class="range-value__cards slider-value" for="cards-slider" id="range-value-cards">20</label>
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
  if (localStorage.getItem('showAnswer') === 'true') {
    document.getElementById('show-answer').checked = 1;
  }
  if (localStorage.getItem('showAnswer') === 'false') {
    document.getElementById('show-answer').checked = 0;
  }
  if (localStorage.getItem('deleteWord') === 'true') {
    document.getElementById('delete-word').checked = 1;
  }
  if (localStorage.getItem('deleteWord') === 'false') {
    document.getElementById('delete-word').checked = 0;
  }
  if (localStorage.getItem('hardWord') === 'true') {
    document.getElementById('hard-word').checked = 1;
  }
  if (localStorage.getItem('hardWord') === 'false') {
    document.getElementById('hard-word').checked = 0;
  }
  if (localStorage.getItem('transcription') === 'true') {
    document.getElementById('transcription').checked = 1;
  }
  if (localStorage.getItem('transcription') === 'false') {
    document.getElementById('transcription').checked = 0;
  }
  if (localStorage.getItem('example') === 'true') {
    document.getElementById('example').checked = 1;
  }
  if (localStorage.getItem('example') === 'false') {
    document.getElementById('example').checked = 0;
  }
  if (localStorage.getItem('translation') === 'true') {
    document.getElementById('translation').checked = 1;
  }
  if (localStorage.getItem('translation') === 'false') {
    document.getElementById('translation').checked = 0;
  }
  if (localStorage.getItem('sentencesTranslation') === 'true') {
    document.getElementById('sentences-translation').checked = 1;
  }
  if (localStorage.getItem('sentencesTranslation') === 'false') {
    document.getElementById('sentences-translation').checked = 0;
  }
  if (localStorage.getItem('showPicture') === 'true') {
    document.getElementById('show-picture').checked = 1;
  }
  if (localStorage.getItem('showPicture') === 'false') {
    document.getElementById('show-picture').checked = 0;
  }
  if (localStorage.getItem('explanation') === 'true') {
    document.getElementById('explanation').checked = 1;
  }
  if (localStorage.getItem('explanation') === 'false') {
    document.getElementById('explanation').checked = 0;
  }
  if (localStorage.getItem('playAudio') === 'true') {
    document.getElementById('play-audio').checked = 1;
  }
  if (localStorage.getItem('playAudio') === 'false') {
    document.getElementById('play-audio').checked = 0;
  }
}
