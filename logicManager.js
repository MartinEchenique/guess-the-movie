/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import moviesArray from './moviesList.js';
import observer from './Observer.js';
import { movieFromResponse } from './Movie.js';

let movie;

const game = { roundPoints: 10, totalPoints: 0, isNewGame: true };

async function changeMovieData() {
  const id = moviesArray.splice(Math.floor(Math.random() * moviesArray.length), 1)[0];
  const response = await fetch(`/*api call*/`, { mode: 'cors' });
  const data = await response.json();
  movie = movieFromResponse(data);
}
async function startNewRound() {
  await changeMovieData();
  observer.notify('displayNewMovie', movie.hidden, movie.image);
  if (game.isNewGame) {
    game.roundPoints = 10;
    game.totalPoints = 0;
  } else {
    game.totalPoints += game.roundPoints;
    game.roundPoints = 10;
  }
  observer.notify('pointsUpdated', game.roundPoints, game.totalPoints);
}
function gameOver() {
  observer.notify('roundFinish', true);
  observer.notify('hiddenChange', movie.title);
  game.isNewGame = true;
}
function handleWrongAnswer() {
  switch (game.roundPoints) {
    case 10:
      observer.notify('movieDataUnhidden', 'genre', movie.genre);
      game.roundPoints -= 1;
      break;
    case 9:
      observer.notify('movieDataUnhidden', 'releaseDate', movie.releaseDate);
      game.roundPoints -= 1;
      break;
    case 8:
      observer.notify('movieDataUnhidden', 'actors', movie.actors);
      game.roundPoints -= 2;
      break;
    case 6:
      observer.notify('movieDataUnhidden', 'keyword', movie.keywords);
      game.roundPoints -= 3;
      break;
    case 3:
      observer.notify('movieDataUnhidden', 'description', movie.description);
      game.roundPoints -= 2;
      break;
    case 1:
      game.roundPoints -= 1;
      observer.notify('gameOver');
      gameOver();
      break;
    default:
      break;
  }
  observer.notify('pointsUpdated', game.roundPoints, game.totalPoints);
}
function finishRound() {
  observer.notify('roundFinish', false);
  game.isNewGame = false;
}

function keyPressedHandler(letter) {
  const containsLetter = movie.containsLetter(letter);
  if (containsLetter) {
    observer.notify('leterStatusChangue', letter, 'right');
    observer.notify('hiddenChange', containsLetter);
    if (movie.hidden === movie.title)finishRound();
  } else {
    observer.notify('leterStatusChangue', letter, 'wrong');
    handleWrongAnswer();
  }
}

function startLogic() {
  observer.subscribe('keyPressed', keyPressedHandler);
  observer.subscribe('finishRound', startNewRound);
}
startNewRound();

export { startLogic, startNewRound };
