export function repeatAudio() {
  const audio = document.getElementById('audiochallenge__word-audio');

  audio.play();
}

export function audioIconListener() {
  const icon = document.querySelector('.audiochallenge__speak-icon');

  icon.addEventListener('click', repeatAudio);
}
