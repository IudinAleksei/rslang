const CREATE_INPUT = (wrap, word) => {
  const INPUT = document.createElement('INPUT');
  INPUT.type = 'text';
  INPUT.className = ('input');
  INPUT.autofocus = true;
  INPUT.size = word.length;
  wrap.appendChild(INPUT);
};
export default CREATE_INPUT;
