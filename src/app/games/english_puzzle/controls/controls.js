import { getAndInitSessionData } from '../../../common/utils/sessionStorage';

export default function puzzleGameHandling() {
  const object = getAndInitSessionData();

  document.querySelector('.container-game').addEventListener('click', (event) => {
    console.log(object);
    if (event.target.className === 'puzzle-word' || event.target.className === 'puzzle-word fon') {
      event.target.remove(event.target);
      document.getElementById(`big${object.puzzleCounterBox}`).append(event.target);
      const len = document.getElementById('text').getElementsByTagName('*');
      if (len.length === 0) {
        document.getElementById('check').style.display = 'block';
      }
    }
  });
}
