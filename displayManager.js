/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import observer from './Observer.js';

const elementsReference = (() => {
  const imgContainer = document.querySelector('#img-container');
  const movieName = document.getElementById('name-to-guess');
  const finishButton = document.getElementById('finish-button');
  const movieGenre = document.getElementById('movie-genre');
  const releaseDate = document.getElementById('movie-year');
  const movieActors = document.getElementById('movie-cast');
  const movieKeyword = document.getElementById('movie-keyword');
  const movieDescription = document.getElementById('movie-description');
  const roundPointsDisplay = document.getElementById('round-points');
  const totalPointsDisplay = document.getElementById('total-points');
  const img = document.querySelector('#img-container img');
  const virtualKeyboardButtons = Array.from(document.querySelectorAll('#keyboard button'));
  return {
    imgContainer,
    movieName,
    finishButton,
    movieGenre,
    releaseDate,
    movieActors,
    movieKeyword,
    movieDescription,
    roundPointsDisplay,
    totalPointsDisplay,
    img,
    virtualKeyboardButtons,

  };
})();
function addBehaviorToVirtualKeyboard() {
  elementsReference.virtualKeyboardButtons.forEach((currentfinishButton) => {
    currentfinishButton.addEventListener('click', (e) => {
      e.target.disabled = true;
      observer.notify('keyPressed', e.target.textContent);
    });
  });
}
function linkVirtualAndFisicalKeyboard() {
  document.body.addEventListener('keypress', (e) => {
    if (e.key.match(/[qwertyuiopasdfghjklzxcvbnm]/i) && e.key.length === 1) {
      document.getElementById(`${e.key.toUpperCase()}button`).click();
    }
  });
}
function addBehaviorToFinisButton() {
  elementsReference.finishButton.addEventListener('click', () => observer.notify('finishRound'));
}
function showAllContent(isGameOver) {
  elementsReference.img.classList.add('no-blur');
  elementsReference.virtualKeyboardButtons.forEach((currentfinishButton) => {
    currentfinishButton.disabled = true;
  });
  elementsReference.finishButton.style.visibility = 'visible';
  elementsReference.finishButton.focus();
  elementsReference.finishButton.textContent = isGameOver ? 'Play Again!' : 'Next Round!';
}
function toggleClassWithDelay(element, time, className) {
  element.classList.toggle(className);
  setTimeout(() => element.classList.toggle(className), time);
}
function letterStatusChangeDisplayHandler(letter, status) {
  const letterButtonToChange = document.getElementById(`${letter}button`);
  if (status === 'right') {
    letterButtonToChange.className = 'right-letter';
  } else if (status === 'wrong') {
    letterButtonToChange.className = 'wrong-letter';
  }
}
function movieDataUnhiddenDisplay(dataName, dataContent) {
  switch (dataName) {
    case 'genre':
      elementsReference.movieGenre.textContent = `${dataContent.join(', ')}`;
      elementsReference.movieGenre.classList.add('show');
      toggleClassWithDelay(elementsReference.movieGenre, 1000, 'marked');
      elementsReference.movieGenre.previousElementSibling.classList.add('show');
      break;
    case 'releaseDate':
      elementsReference.releaseDate.textContent = `${dataContent}`;
      elementsReference.releaseDate.classList.add('show');
      toggleClassWithDelay(elementsReference.releaseDate, 1000, 'marked');
      elementsReference.releaseDate.previousElementSibling.classList.add('show');
      break;
    case 'actors':
      elementsReference.movieActors.textContent = `${dataContent.join(', ')}`;
      elementsReference.movieActors.classList.add('show');
      toggleClassWithDelay(elementsReference.movieActors, 1000, 'marked');
      elementsReference.movieActors.previousElementSibling.classList.add('show');
      break;
    case 'keyword':
      elementsReference.movieKeyword.textContent = `${dataContent.replace(/,/g, ', ')}`;
      elementsReference.movieKeyword.classList.add('show');
      toggleClassWithDelay(elementsReference.movieKeyword, 1000, 'marked');
      elementsReference.movieKeyword.previousElementSibling.classList.add('show');
      break;
    case 'description':
      elementsReference.movieDescription.textContent = `${dataContent}`;
      elementsReference.movieDescription.classList.add('show');
      toggleClassWithDelay(elementsReference.movieDescription, 1500, 'marked');
      elementsReference.movieDescription.previousElementSibling.classList.add('show');
      break;
    default:
      break;
  }
}
function wordHiddenChange(newWord) {
  elementsReference.movieName.textContent = newWord;
}
function updatePointsDisplay(roundPoints, totalPoints) {
  elementsReference.roundPointsDisplay.textContent = roundPoints;
  elementsReference.totalPointsDisplay.textContent = totalPoints;
}
function displayNewMovie(hidden, image) {
  elementsReference.img.classList.remove('no-blur');
  elementsReference.finishButton.style.visibility = 'hidden';
  elementsReference.movieName.textContent = hidden;
  elementsReference.img.src = image;
  elementsReference.virtualKeyboardButtons.forEach((currentButton) => {
    currentButton.disabled = false;
    currentButton.className = '';
  });
  elementsReference.movieGenre.classList.remove('show');
  elementsReference.releaseDate.classList.remove('show');
  elementsReference.movieActors.classList.remove('show');
  elementsReference.movieKeyword.classList.remove('show');
  elementsReference.movieDescription.classList.remove('show');
}
function startDisplay() {
  addBehaviorToVirtualKeyboard();
  linkVirtualAndFisicalKeyboard();
  addBehaviorToFinisButton();
  observer.subscribe('leterStatusChangue', letterStatusChangeDisplayHandler);
  observer.subscribe('hiddenChange', wordHiddenChange);
  observer.subscribe('roundFinish', showAllContent);
  observer.subscribe('movieDataUnhidden', movieDataUnhiddenDisplay);
  observer.subscribe('pointsUpdated', updatePointsDisplay);
  observer.subscribe('displayNewMovie', displayNewMovie);
}

export default startDisplay;
