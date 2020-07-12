import '../sass/cardWithWord.scss';
import CREATE_DOM_ELEMENTS from './domElements';

const CREATE_IMAGE_TOOLTIL = (image) => {
  if (image) {
    const DIV_IMAGE = `<div class="image">
                      <img src=${image}>
                     </div>`;
    document.querySelector('.card').insertAdjacentHTML('afterbegin', DIV_IMAGE);
  }
};
export const CREATE_TRANSCRIPT_TOOLTIL = (transcript) => {
  if (transcript) {
    const TRANSCRIPT_WORD = `<p class="transcript">${transcript}</p>`;
    document.querySelector('.sentense').insertAdjacentHTML('afterbegin', TRANSCRIPT_WORD);
  }
};

export const CREATE_EXPLANATION_TOOLTIL = (text) => {
  if (text) {
    const EXPLANATION_WORD = `<p class="translate-sentense">${text}</p>`;
    document.querySelector('.sentense').insertAdjacentHTML('afterbegin', EXPLANATION_WORD);
  }
};
export const CREATE_TEXTMEANING_TOOLTIL = (meaning) => {
  if (meaning) {
    const TEXT_MEANING_WORD = `<p class="meaning-word">${meaning}</p>`;
    document.querySelector('.sentense').insertAdjacentHTML('afterbegin', TEXT_MEANING_WORD);
  }
};
const CREATE_TRANSLATE_SENTENSE_TOOLTIL = (translate) => {
  if (translate) {
    const TRANSLATE_SENTENSE = `<p class="explanation-word">${translate}</p>`;
    document.querySelector('.sentense').insertAdjacentHTML('afterbegin', TRANSLATE_SENTENSE);
  }
};
const CREATE_TRANSLATE_WORD_TOOLTIL = (word) => {
  if (word) {
    const TRANSLATE_WORD = `<p class="translate-word">${word}</p>`;
    document.querySelector('.sentense').insertAdjacentHTML('afterbegin', TRANSLATE_WORD);
  }
};

const createCardWord = (transcript, explanation, translate, image, word, meaning) => {
  CREATE_DOM_ELEMENTS();
  CREATE_IMAGE_TOOLTIL(image);
  CREATE_TRANSLATE_WORD_TOOLTIL(word);
  CREATE_TRANSCRIPT_TOOLTIL(transcript);
  CREATE_TRANSLATE_SENTENSE_TOOLTIL(translate);
  CREATE_TEXTMEANING_TOOLTIL(meaning);
  CREATE_EXPLANATION_TOOLTIL(explanation);
};

export default createCardWord;
