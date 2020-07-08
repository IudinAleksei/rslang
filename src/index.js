import App from './app/main/statistics/app';

window.onload = () => {
  const app = new App();
  const root = document.querySelector('.main-container');
  app.initApp(root);
};
