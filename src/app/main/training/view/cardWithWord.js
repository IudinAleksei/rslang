// Исправить
// const ELEMENT = [{
//   0: (image) => `<div class="image">
//                   <img src=${image}>
//                  </div>`,
//   0: (transcript) => `<p class="transcript">${transcript}</p>`,
//   0: (explanationWword) => `<p class="explanation-word">${explanationWword}</p>`,
//   0: (meaningWword) => `<p class="meaning-word">${meaningWword}</p>`,
//   0: (translateSentense) => `<p class="translate-sentense">${translateSentense}</p>`,
//   0: (translateWord) => `<p class="translate-word">${translateWord}</p>`,
// }];

const createCardWord = () => {
  const DIV_WRAP = document.createElement('div');
  DIV_WRAP.className = 'main__wrap-cards';
  document.querySelector('.main-container').appendChild(DIV_WRAP);

  const DIV_CONTROLS_BAR = document.createElement('div');
  DIV_CONTROLS_BAR.className = ('conrtols-bar');

  const BUTTONS_CONTROLS_BAR = `<button class="delete-word">
                                  <img src="assets/chat-quote.svg">
                                </button>
                                <button class="explanation">
                                  <img src="assets/trash.svg">
                                </button>
                                <button class="play-audio">
                                <img src="assets/caret-right.svg">
                                </button>`;
  DIV_WRAP.appendChild(DIV_CONTROLS_BAR);
  DIV_CONTROLS_BAR.insertAdjacentHTML('afterbegin', BUTTONS_CONTROLS_BAR);

  const DIV_WRAP_CARD = document.createElement('div');
  DIV_WRAP_CARD.className = ('wrap-card');

  const DIV_CARD = document.createElement('div');
  DIV_CARD.className = ('card');
  DIV_WRAP_CARD.appendChild(DIV_CARD);

  const INPUT = document.createElement('input');
  INPUT.className = ('input');
  INPUT.focus();
  DIV_CARD.appendChild(INPUT);
  const SENTENSE = document.createElement('div');
  SENTENSE.className = ('sentense');

  const DIV_CHECK_WORD = document.createElement('div');
  DIV_CHECK_WORD.className = ('wrap-buttons__check-word');
  const BUTTONS_CHECK_WORDS = `<button class="show-answer">show ansver</button>
                           <button class="enter">next</button>`;

  DIV_CHECK_WORD.insertAdjacentHTML('afterbegin', BUTTONS_CHECK_WORDS);
  DIV_WRAP.appendChild(DIV_CHECK_WORD);

  const DIV_PROGRESS = document.createElement('progress');
  DIV_PROGRESS.className = ('progress');
  DIV_WRAP.appendChild(DIV_PROGRESS);
};
export default createCardWord;
