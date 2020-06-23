export default function puzzleGameHandling() {
  document.querySelector('.container-game').addEventListener('click', (event) => {
    if (event.target.className === 'puzzle-word' || event.target.className === 'puzzle-word fon') {
      event.target.remove(event.target);
      document.getElementById(`big${sessionStorage.getItem('counterBox')}`).append(event.target);
      const len = document.getElementById('text').getElementsByTagName('*');
      if (len.length === 0) {
        document.getElementById('check').style.display = 'block';
      }
    }
  });
}
