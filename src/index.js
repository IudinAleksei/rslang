import App from './app/games/speakIt/app';

window.onload = () => {
  const app = new App();
  app.initApp();
  app.addListeners();
};
