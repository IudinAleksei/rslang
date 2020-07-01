import menuHandlers from './menuHandlers';

export default function menuClickHandler() {
  document.querySelector('.menu').addEventListener('click', (event) => {
    const el = event.target.closest('.menu__items__item');
    if (el) {
      const functionName = el.dataset.handler;
      if (functionName !== undefined) {
        menuHandlers[functionName]();
      } else {
        // eslint-disable-next-line no-alert
        alert('эта страница еще не создана');
      }
    }
  });
}
