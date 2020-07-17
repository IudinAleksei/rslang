export default function showInformationWord() {
  if (localStorage.getItem('trainingSound') === 'true') {
    document.querySelector('.sounds').classList.add('main-game_sound-on');
    document.querySelector('.sounds').classList.remove('main-game_sound-off');
  } else {
    document.querySelector('.sounds').classList.remove('main-game_sound-on');
    document.querySelector('.sounds').classList.add('main-game_sound-off');
  }
  if (localStorage.getItem('showAnswer') === 'true') {
    document.querySelector('.show-answer').style.display = 'block';
  } else {
    document.querySelector('.show-answer').style.display = 'none';
  }
  if (localStorage.getItem('deleteWord') === 'true') {
    document.querySelector('.delete-word').style.display = 'block';
  } else {
    document.querySelector('.delete-word').style.display = 'none';
  }
  if (localStorage.getItem('playAudio') === 'true') {
    document.querySelector('.play-audio').style.display = 'block';
  } else {
    document.querySelector('.play-audio').style.display = 'none';
  }
  if (localStorage.getItem('hardWord') === 'true') {
    document.querySelector('.wrap-card__button-hard-word').style.display = 'block';
  } else {
    document.querySelector('.wrap-card__button-hard-word').style.display = 'none';
  }
  if (localStorage.getItem('transcription') === 'true') {
    document.querySelector('.transcript').style.display = 'block';
  } else {
    document.querySelector('.transcript').style.display = 'none';
  }
  if (localStorage.getItem('example') === 'true') {
    document.querySelector('.word-start').style.display = 'inline-block';
    document.querySelector('.word-end').style.display = 'inline-block';
    document.querySelector('.translate-sentense').style.display = 'block';
  } else {
    document.querySelector('.word-start').style.display = 'none';
    document.querySelector('.word-end').style.display = 'none';
    document.querySelector('.translate-sentense').style.display = 'none';
  }
  if (localStorage.getItem('showPicture') === 'true') {
    document.querySelector('.image').style.display = 'block';
  } else {
    document.querySelector('.image').style.display = 'none';
  } if (localStorage.getItem('explanation') === 'true') {
    document.querySelector('.meaning-word').style.display = 'block';
    document.querySelector('.explanation-word').style.display = 'block';
    document.querySelector('.explanation').style.display = 'block';
  } else {
    document.querySelector('.meaning-word').style.display = 'none';
    document.querySelector('.explanation-word').style.display = 'none';
    document.querySelector('.explanation').style.display = 'none';
  }
}
