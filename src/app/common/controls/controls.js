import menuHandlers from '../../main/menu/menuHandlers';

export default function renderMenuItem() {
  document.querySelector('.menu').addEventListener('click', (event) => {
    const el = event.target.closest('.menu__items__item');
    if (el) {
      const functionName = el.dataset.handler;
      if (functionName !== undefined) {
        menuHandlers[functionName]();
      } else {
        alert('этот страница еще не создана');
      }
    }
  });
}
