/* eslint-disable no-param-reassign */
import game from '../../primary/index';

export default function sliderSettingsPageHandling() {
  const sliderNewWords = document.querySelector('.range-slider__words');
  const sliderCounterNewWords = document.querySelector('.range-value__words');
  const sliderCards = document.querySelector('.range-slider__cards');
  const sliderCounterCards = document.querySelector('.range-value__cards');
  const body = document.querySelector('body');

  body.className = 'body__settings-page';
  function getSliderHandler(element) {
    const slider = element;
    return function assignInnerHtml(event) {
      slider.innerHTML = event.target.value;
      if (sliderCounterCards) {
        localStorage.setItem('cards', sliderCards.value);
      }
      if (sliderNewWords) {
        localStorage.setItem('newWord', sliderNewWords.value);
      }
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
  playButton.addEventListener('click', () => game());
  document.querySelector('.main-container').addEventListener('change', () => {
    if (document.getElementById('show-answer').checked) {
      localStorage.setItem('showAnswer', true);
    } else {
      localStorage.setItem('showAnswer', false);
    }
    if (document.getElementById('delete-word').checked) {
      localStorage.setItem('deleteWord', true);
    } else {
      localStorage.setItem('deleteWord', false);
    }
    if (document.getElementById('hard-word').checked) {
      localStorage.setItem('hardWord', true);
    } else {
      localStorage.setItem('hardWord', false);
    }
    if (document.getElementById('transcription').checked) {
      localStorage.setItem('transcription', true);
    } else {
      localStorage.setItem('transcription', false);
    }
    if (document.getElementById('example').checked) {
      localStorage.setItem('example', true);
    } else {
      localStorage.setItem('example', false);
    }
    if (document.getElementById('translation').checked) {
      localStorage.setItem('translation', true);
    } else {
      localStorage.setItem('translation', false);
    }
    if (document.getElementById('sentences-translation').checked) {
      localStorage.setItem('sentencesTranslation', true);
    } else {
      localStorage.setItem('sentencesTranslation', false);
    }
    if (document.getElementById('show-picture').checked) {
      localStorage.setItem('showPicture', true);
    } else {
      localStorage.setItem('showPicture', false);
    }
    if (document.getElementById('explanation').checked) {
      localStorage.setItem('explanation', true);
    } else {
      localStorage.setItem('explanation', false);
    }
    if (document.getElementById('play-audio').checked) {
      localStorage.setItem('playAudio', true);
    } else {
      localStorage.setItem('playAudio', false);
    }
  });
}
