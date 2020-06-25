function createSpeakIcon() {
  const div = document.createElement('div');
  div.classList.add('speak-icon');
  document.querySelector('.audiochallenge-assets').append(div);
}

function createImage() {
  const image = document.createElement('img');
  image.classList.add('audiochallenge-image');
  document.querySelector('.audiochallenge-assets').prepend(image);
}

export { createSpeakIcon, createImage };
