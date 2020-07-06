import '../sass/cardWithWord.scss';
import CREATE_DOM_ELEMENTS from './domElements';

export const CREATE_IMAGE_TOOLTIL = (image) => {
  if (image) {
    const DIV_IMAGE = `<div class="image">
    //                   <img src=${image}>
    //                  </div>`;
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
    const EXPLANATION_WORD = `<p class="explanation-word">${text}</p>`;
    document.querySelector('.sentense').insertAdjacentHTML('afterbegin', EXPLANATION_WORD);
  }
};
export const CREATE_TRANSLATE_SENTENSE_TOOLTIL = (translate) => {
  if (translate) {
    const TRANSLATE_SENTENSE = `<p class="translate-sentense">${translate}</p>`;
    document.querySelector('.sentense').insertAdjacentHTML('afterbegin', TRANSLATE_SENTENSE);
  }
};
export const CREATE_TRANSLATE_WORD_TOOLTIL = (word) => {
  if (word) {
    const TRANSLATE_WORD = `<p class="translate-word">${word}</p>`;
    document.querySelector('.sentense').insertAdjacentHTML('afterbegin', TRANSLATE_WORD);
  }
};

const createCardWord = () => {
  CREATE_DOM_ELEMENTS();
};

export default createCardWord;
