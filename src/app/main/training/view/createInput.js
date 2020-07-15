const CREATE_INPUT = (wrap) => {
  const containerContext = document.createElement('p');
  containerContext.classList = 'container-context';
  wrap.append(containerContext);
  const wordStart = document.createElement('span');
  wordStart.classList = 'word-start';
  containerContext.append(wordStart);
  const inputContainer = document.createElement('span');
  inputContainer.classList = 'input-container';
  containerContext.append(inputContainer);
  const inputBackground = document.createElement('span');
  inputBackground.classList = 'input-background';
  inputContainer.append(inputBackground);
  const INPUT = document.createElement('input');
  INPUT.type = 'text';
  INPUT.className = ('input');
  INPUT.autofocus = true;
  inputContainer.append(INPUT);
  const wordEnd = document.createElement('span');
  wordEnd.classList = 'word-end';
  containerContext.append(wordEnd);
};

export default CREATE_INPUT;
