/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
import { getAndInitSessionData } from '../../../common/utils/sessionStorage';

const object = getAndInitSessionData();

function handleDrag(item) {
  const selectedItem = item.target;
  const x = event.clientX;
  const y = event.clientY;
  selectedItem.classList.add('drag-sort-active');
  let swapItem = document.elementFromPoint(x, y) === null
    ? selectedItem : document.elementFromPoint(x, y);
  if (document.getElementById(`big${object.puzzleCounterBox}`) === swapItem.parentNode) {
    swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
    return document.getElementById(`big${object.puzzleCounterBox}`).insertBefore(selectedItem, swapItem);
  }
  if (document.getElementById('text') === swapItem.parentNode) {
    swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
    return document.getElementById('text').insertBefore(selectedItem, swapItem);
  }
  return true;
}
function handleDrop(item) {
  item.target.classList.remove('drag-sort-active');
}
function enableDragItem(item) {
  item.ondrag = handleDrag;
  item.ondragend = handleDrop;
}

export function enableDragSort() {
  document.body.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/html', event.target);
  });
  const sortElement = document.getElementsByClassName('puzzle-word');
  Array.from(sortElement).forEach((item) => {
    console.log(item);
    enableDragItem(item);
  });
}
export function drags() {
  const fillBox = document.getElementById(`big${object.puzzleCounterBox}`);
  const fillText = document.getElementById('text');
  let selectedBox;
  console.log(fillBox);
  document.body.addEventListener('dragstart', (event) => {
    selectedBox = event.target;
    event.dataTransfer.setData('text/html', event.target);
  });
  fillBox.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  });
  fillBox.addEventListener('drop', function (event) {
    console.log(event.target);
    if (event.target.id === `big${object.puzzleCounterBox}`) this.insertBefore(selectedBox, this.nextElementSibling);
  });
  fillText.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  });
  fillText.addEventListener('drop', function (event) {
    console.log(event.target);
    if (event.target.id === 'text') this.appendChild(selectedBox);
  });
}
