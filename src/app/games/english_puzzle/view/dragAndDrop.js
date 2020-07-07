/* eslint-disable func-names */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
function handleDrag(item) {
  const selectedItem = item.target;
  const x = event.clientX;
  const y = event.clientY;
  selectedItem.classList.add('puzzle-game__drag-sort-active');
  let swapItem = document.elementFromPoint(x, y) === null
    ? selectedItem : document.elementFromPoint(x, y);
  if (document.getElementById('box') === swapItem.parentNode) {
    swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
    return document.getElementById('box').insertBefore(selectedItem, swapItem);
  }
  if (document.getElementById('text') === swapItem.parentNode) {
    swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
    return document.getElementById('text').insertBefore(selectedItem, swapItem);
  }
  return true;
}
function handleDrop(item) {
  item.target.classList.remove('puzzle-game__drag-sort-active');
}
function enableDragItem(item) {
  item.ondrag = handleDrag;
  item.ondragend = handleDrop;
}

export function enableDragSort() {
  document.body.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/html', event.target);
  });
  const sortElement = document.getElementsByClassName('puzzle-game__puzzle-word');
  Array.from(sortElement).forEach((item) => {
    enableDragItem(item);
  });
}
export function drags() {
  const fillBox = document.getElementById('box');
  const fillText = document.getElementById('text');
  let selectedBox;
  document.body.addEventListener('dragstart', (event) => {
    selectedBox = event.target;
    event.dataTransfer.setData('text/html', event.target);
  });
  fillBox.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  });
  fillBox.addEventListener('drop', function (event) {
    if (event.target.id === 'box') this.insertBefore(selectedBox, this.nextElementSibling);
    const len = document.getElementById('text').getElementsByTagName('*');
    if (len.length === 0) {
      document.getElementById('check').style.display = 'block';
    }
  });
  fillText.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  });
  fillText.addEventListener('drop', function (event) {
    if (event.target.id === 'text') {
      this.appendChild(selectedBox);
    }
  });
}
