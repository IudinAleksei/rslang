const CREATE_INPUT = (wrap) => {
  const INPUT = document.createElement('INPUT');
  INPUT.type = 'text';
  INPUT.className = ('input');
  INPUT.autofocus = true;
  wrap.appendChild(INPUT);
};

export default CREATE_INPUT;

export const SET_INPUT_LENGTH = (word) => {
  document.querySelector('.input').size = word.length;
};
