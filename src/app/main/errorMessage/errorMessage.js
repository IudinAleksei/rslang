function onRefreshButtonClick() {
  window.location.reload();
}

function onCloseIconClick() {
  const errorMessage = document.querySelector('.page-message-wrapper');
  errorMessage.classList.add('page-message-hidden');
}

export default function errorHandling() {
  const refresh = document.querySelector('.button-reset');
  refresh.addEventListener('click', onRefreshButtonClick);
  document.querySelector('.close-icon').addEventListener('click', onCloseIconClick);
}
