import App from './app/games/speakIt/index';

window.onload = () => {
  const app = new App();
  app.initApp();
  app.addListeners();
};
