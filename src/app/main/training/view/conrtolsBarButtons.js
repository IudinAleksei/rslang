const CREATE_CONTROLS_BAR_BUTTONS = (wrap) => {
  const ELEMENTS_BUTTON = [{
    class: 'delete-word',
    src: './assets/icons/card/chat-quote.svg',
  },
  {
    class: 'explanation',
    src: './assets/icons/card/trash.svg',
  },
  {
    class: 'play-audio',
    src: './assets/icons/card/caret-right.svg',
  },
  ];
  const DIV_CONTROLS_BAR = document.createElement('div');
  DIV_CONTROLS_BAR.className = ('conrtols-bar');
  for (let i = 0; i < ELEMENTS_BUTTON.length; i += 1) {
    const BUTTON = document.createElement('button');
    BUTTON.className = ELEMENTS_BUTTON[i].class;
    const BUTTON_IMAGE = document.createElement('img');
    BUTTON_IMAGE.src = ELEMENTS_BUTTON[i].src;
    BUTTON.appendChild(BUTTON_IMAGE);
    DIV_CONTROLS_BAR.appendChild(BUTTON);
  }
  wrap.appendChild(DIV_CONTROLS_BAR);
};
export default CREATE_CONTROLS_BAR_BUTTONS;
