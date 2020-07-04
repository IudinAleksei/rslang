const CREATE_CHECK_WORDS_BUTONS = (wrap) => {
  const ELEMENT_BUTTONS = [{
    class: 'show-answer',
    text: 'show ansver',
  },
  {
    class: 'enter',
    text: 'next',
  },
  ];
  const DIV_CHECK_WORD = document.createElement('div');
  DIV_CHECK_WORD.className = ('wrap-buttons__check-word');
  for (let i = 0; i < ELEMENT_BUTTONS.length; i += 1) {
    const BUTTON = document.createElement('button');
    BUTTON.className = ELEMENT_BUTTONS[i].class;
    BUTTON.innerText = ELEMENT_BUTTONS[i].text;
    DIV_CHECK_WORD.appendChild(BUTTON);
  }
  wrap.appendChild(DIV_CHECK_WORD);
};
export default CREATE_CHECK_WORDS_BUTONS;
