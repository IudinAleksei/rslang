import App from './app';

const generateSpeakit = () => {
  const app = new App();
  const root = document.querySelector('.main-container');
  root.innerHTML = '';
  app.initApp(root);
};

export default generateSpeakit;
