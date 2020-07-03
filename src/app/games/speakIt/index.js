import App from './app';

const generateSpeakit = () => {
  const app = new App();
  document.querySelector('.main-container').outerHTML = document.querySelector('.main-container').outerHTML;
  const root = document.querySelector('.main-container');
  root.innerHTML = '';
  app.initApp(root);
};

export default generateSpeakit;
