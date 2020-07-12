export function repeatAudio() {
  const audio = document.getElementById('word-audio');

  audio.play();
}

export function audioIconListener() {
  const icon = document.querySelector('.speak-icon');

  icon.addEventListener('click', repeatAudio);
}
