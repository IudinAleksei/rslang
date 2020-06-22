export default function sliderSettingsPageHandling() {
  const sliderNewWords = document.querySelector('.range-slider__words');
  const sliderCounterNewWords = document.querySelector('.range-value__words');
  const sliderCards = document.querySelector('.range-slider__cards');
  const sliderCounterCards = document.querySelector('.range-value__cards');

  document.getElementById('show-picture').checked = true; //  check one checkbox on settings page

  // slider on the settings page
  function slidingProgressNewWords() {
    sliderCounterNewWords.innerHTML = sliderNewWords.value;
  }

  function slidingProgressCards() {
    sliderCounterCards.innerHTML = sliderCards.value;
  }
  sliderNewWords.addEventListener('input', slidingProgressNewWords);
  sliderCards.addEventListener('input', slidingProgressCards);
}
