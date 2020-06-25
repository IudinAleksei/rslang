/* eslint-disable no-param-reassign */
export default function sliderSettingsPageHandling() {
  const sliderNewWords = document.querySelector('.range-slider__words');
  const sliderCounterNewWords = document.querySelector('.range-value__words');
  const sliderCards = document.querySelector('.range-slider__cards');
  const sliderCounterCards = document.querySelector('.range-value__cards');
  const body = document.querySelector('body');

  body.classList.add('body__settings-page');
  // slider on the settings page
  function getSliderHandler(element) {
    return function assignInnerHtml(event) {
      element.innerHTML = event.target.value;
    };
  }

  sliderNewWords.addEventListener('input', getSliderHandler(sliderCounterNewWords));
  sliderCards.addEventListener('input', getSliderHandler(sliderCounterCards));

  const inputs = document.querySelectorAll('.settings-checkbox:required');
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
