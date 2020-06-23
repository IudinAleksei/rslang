export default function sliderSettingsPageHandling() {
  const sliderNewWords = document.querySelector('.range-slider__words');
  const sliderCounterNewWords = document.querySelector('.range-value__words');
  const sliderCards = document.querySelector('.range-slider__cards');
  const sliderCounterCards = document.querySelector('.range-value__cards');

  // slider on the settings page
  function slidingProgressNewWords() {
    sliderCounterNewWords.innerHTML = sliderNewWords.value;
  }

  function slidingProgressCards() {
    sliderCounterCards.innerHTML = sliderCards.value;
  }
  sliderNewWords.addEventListener('input', slidingProgressNewWords);
  sliderCards.addEventListener('input', slidingProgressCards);

  const inputs = document.querySelectorAll('input[type=checkbox]');
  const playButton = document.querySelector('.settings__play-button');

  function checkSelectedCheckboxes() {
    playButton.disabled = true;
    inputs.forEach((input) => {
      if (input.checked) {
        playButton.disabled = false;
      }
    });
  }
  inputs.forEach((input) => {
    input.addEventListener('change', checkSelectedCheckboxes);
  });
}
