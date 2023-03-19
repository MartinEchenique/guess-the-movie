class Movie {
  constructor(title, actors, genre, releaseDate, awards, description, image) {
    this.title = title;
    this.actors = actors;
    this.genre = genre;
    this.releaseDate = releaseDate;
    this.awards = awards;
    this.description = description;
    this.image = image;
    this.hidden = this.#getHiddedTitle();
  }

  #getHiddedTitle() {
    // returns the title with the letter from the english alphabet remplaced for "_"
    const filter = /[qwertyuiopasdfghjklzxcvbnm]/gi;
    return this.title.replace(filter, '_');
  }

  containsLetter(leter) {
  /* test if the title contains a given letter, if true, returns
    the hidden tittle with the leter added, if false returns false; */

    if (!this.title.toUpperCase().includes(leter.toUpperCase())) return false;
    this.title.split('').forEach((titleLeter, index) => {
      if (titleLeter.toUpperCase() === leter.toUpperCase()) {
        this.hidden = this.hidden.substring(0, index)
        + titleLeter + this.hidden.substring(index + 1);
      }
    });
    return this.hidden;
  }

  checkForHiddenFullyShown() {
    return (this.title === this.hidden);
  }
}
function removeSpecialCharacters(wordList) {
  return wordList.map((word) => {
    if (Array.isArray(word)) return removeSpecialCharacters(word);
    return word.replace(/&apos;/gi, "'").replace(/&amp;/gi, '&').replace(/&quot;/gi, '"').replace(/&nbsp;/gi, ' ');
  });
}

function movieFromResponse(response) {
  
  let title = response.Title;
  let genre = response.Genre;
  let description = response.Plot;
  let image = response.Poster;
  let awards = response.Awards;
  let actors = response.Actors;
  let releaseDate = response.Released;
  [title, actors, genre, releaseDate, awards, description, image] = removeSpecialCharacters(
    [title, actors, genre, releaseDate, awards, description, image],
  );
  const movie = new Movie(title, actors, genre, releaseDate, awards, description, image);
  return movie;
}

export default Movie;
export { movieFromResponse };
