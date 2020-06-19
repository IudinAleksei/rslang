import App from './app';

window.onload = () => {
  const app = new App();
  app.initApp();
  app.addListeners();
};
