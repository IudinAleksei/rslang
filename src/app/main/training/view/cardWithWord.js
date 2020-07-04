import '../sass/cardWithWord.scss';
import CREATE_CONTROLS_BAR_BUTTONS from './conrtolsBarButtons';
import CREATE_CHECK_WORDS_BUTONS from './checkWordsButtons';
import CREATE_INPUT from './createInput';

const CREATE_IMAGE_TOOLTIL = (wrap) => {
  const DIV_IMAGE = document.createElement('div');
  DIV_IMAGE.className = 'image';
  const IMAGE = document.createElement('img');
  IMAGE.src = './assets/img/What-is-it-like-working-in-IT.jpg'; //image
  DIV_IMAGE.appendChild(IMAGE);
  wrap.appendChild(DIV_IMAGE);
};
const CREATE_TEXT_TOOLTIP = (wrap) => {
  const P_ELEMENT = [{
    class: 'transcript',
    value: '[ˈwɜːk]',
  },
  {
    class: 'explanation-word',
    value: 'to perform or carry through a task requiring sustained effort or continuous repeated operations',
  },
  {
    class: 'meaning-word',
    value: 'I `<span>work</span>` here.',
  },
  {
    class: 'translate-sentense',
    value: 'Я здесь работаю.',
  },
  {
    class: 'translate-word',
    value: 'работа, труд, дело',
  },
  ];
  for (let i = 0; i < P_ELEMENT.length; i += 1) {
    const P = document.createElement('p');
    P.className = P_ELEMENT[i].class;
    P.innerText = P_ELEMENT[i].value;
    wrap.appendChild(P);
  }
};

const createCardWord = () => {
  const BACKGROUND_CARDS = document.createElement('div');
  BACKGROUND_CARDS.className = 'main__background-cards';
  document.querySelector('.main-container').appendChild(BACKGROUND_CARDS);
  const DIV_WRAP = document.createElement('div');
  DIV_WRAP.className = 'main__wrap-cards';
  document.querySelector('.main-container').appendChild(DIV_WRAP);
  CREATE_CONTROLS_BAR_BUTTONS(DIV_WRAP);

  const DIV_WRAP_CARD = document.createElement('div');
  DIV_WRAP_CARD.className = ('wrap-card');
  DIV_WRAP.appendChild(DIV_WRAP_CARD);
  const DIV_CARD = document.createElement('div');
  DIV_CARD.className = ('card');
  DIV_WRAP_CARD.appendChild(DIV_CARD);
  CREATE_IMAGE_TOOLTIL(DIV_CARD);
  CREATE_INPUT(DIV_CARD, 'work');

  const SENTENSE = document.createElement('div');
  SENTENSE.className = ('sentense');
  CREATE_TEXT_TOOLTIP(SENTENSE);
  DIV_CARD.appendChild(SENTENSE);

  CREATE_CHECK_WORDS_BUTONS(DIV_WRAP);

  const DIV_PROGRESS = document.createElement('progress');
  DIV_PROGRESS.className = ('progress');
  DIV_WRAP.appendChild(DIV_PROGRESS);
};

export default createCardWord;

// const ELEMENT = [{
//   'show-picture': (image) => `<div class="image">
//                   <img src=${image}>
//                  </div>`,
//   transcription: (transcript) => `<p class="transcript">${transcript}</p>`,
//   explanation: (explanationWword) => `<p class="explanation-word">${explanationWword}</p>`,
//   example: (meaningWword) => `<p class="meaning-word">${meaningWword}</p>`,
//   'sentences-translation': (translateSentense) => `<p class="translate-sentense">${translateSentense}</p>,
//   translation: (translateWord) => `<p class="translate-word">${translateWord}</p>`,
// }];
