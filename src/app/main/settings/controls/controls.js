import gameTraining from '../../primary/index';

export default function sliderSettingsPageHandling() {
  const sliderNewWords = document.querySelector('.range-slider__words');
  const sliderCounterNewWords = document.querySelector('.range-value__words');
  const sliderCards = document.querySelector('.range-slider__cards');
  const sliderCounterCards = document.querySelector('.range-value__cards');
  const body = document.querySelector('body');
  const inputs = document.querySelectorAll('.settings-checkbox:required');
  const playButton = document.querySelector('.settings__play-button');
  const trainingMenuElement = Array.from(document.querySelector('.menu__items').querySelectorAll('.menu__items__item'))[3];

  body.className = 'body__settings-page';
  function getSliderHandler(element) {
    const slider = element;

    return function assignInnerHtml() {
      if (slider === sliderCounterNewWords) {
        if (+sliderNewWords.value > +sliderCards.value) {
          sliderCards.value = sliderNewWords.value;
        }
      }

      if (slider === sliderCounterCards) {
        if (+sliderNewWords.value > +sliderCards.value) {
          sliderNewWords.value = sliderCards.value;
        }
      }

      sliderCounterCards.innerHTML = sliderCards.value;
      sliderCounterNewWords.innerHTML = sliderNewWords.value;

      if (sliderCounterCards) {
        localStorage.setItem('cards', sliderCards.value);
      }
      if (sliderNewWords) {
        localStorage.setItem('newWord', sliderNewWords.value);
      }
      if (+sliderNewWords.value > +sliderCards.value) {
        playButton.disabled = true;
      }
      if (+sliderNewWords.value < +sliderCards.value) {
        playButton.disabled = false;
      }
    };
  }

  sliderNewWords.addEventListener('input', getSliderHandler(sliderCounterNewWords));
  sliderCards.addEventListener('input', getSliderHandler(sliderCounterCards));

  function onPlayButtonClick() {
    document.querySelector('.menu__items').querySelectorAll('.menu__items__item').forEach((element) => element.classList.remove('menu__items__item_active'));
    trainingMenuElement.classList.add('menu__items__item_active');
    trainingMenuElement.click();
  }

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
  playButton.addEventListener('click', () => gameTraining());
  playButton.addEventListener('click', onPlayButtonClick);
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
