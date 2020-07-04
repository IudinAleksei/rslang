export function getLoader() {
  const preloader = document.createElement('div');
  preloader.classList.add('preloader');
  const loaderContainer = document.createElement('div');
  loaderContainer.classList.add('cssload-loader');

  const innerOne = document.createElement('div');
  innerOne.classList.add('cssload-inner');
  innerOne.classList.add('cssload-one');
  loaderContainer.append(innerOne);

  const innerTwo = document.createElement('div');
  innerTwo.classList.add('cssload-inner');
  innerTwo.classList.add('cssload-two');
  loaderContainer.append(innerTwo);

  const innerthree = document.createElement('div');
  innerthree.classList.add('cssload-inner');
  innerthree.classList.add('cssload-three');
  loaderContainer.append(innerthree);

  preloader.append(loaderContainer);
  return preloader;
}

export function spinnerOn() {
  const preloader = document.querySelector('.preloader');
  if (preloader.classList.contains('done')) {
    preloader.classList.remove('done');
  }
}

export function spinnerOff() {
  const preloader = document.querySelector('.preloader');
  if (!preloader.classList.contains('done')) {
    preloader.classList.add('done');
  }
  preloader.classList.add('open');
}
