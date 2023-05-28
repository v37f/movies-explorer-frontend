export const formatTime = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return  (hours ? `${hours}ч ` : "") + `${minutes}м`
}

export const checkDurationIsLesser = (movie, value) => {
  return movie.duration <= value;
}

export const checkForKeywordMatch = (movie, keyword) => {
  if (keyword === '*') {
    return true;
  } else {
    const formatedKeyword = keyword?.toLowerCase().trim();
    return movie.country.toLowerCase().includes(formatedKeyword)
    || movie.description.toLowerCase().includes(formatedKeyword)
    || movie.director.toLowerCase().includes(formatedKeyword)
    || movie.director.toLowerCase().includes(formatedKeyword)
    || movie.nameEN.toLowerCase().includes(formatedKeyword)
    || movie.nameRU.toLowerCase().includes(formatedKeyword)
    || movie.year.toLowerCase().includes(formatedKeyword);
  }
}

export const filterMovies = (movies, keyword, shortfilms) => {
  return movies.filter(movie => {
    if (shortfilms) {
      return checkForKeywordMatch(movie, keyword) && checkDurationIsLesser(movie, 40);
    } else {
      return checkForKeywordMatch(movie, keyword);
    }
  });
}

export const setSavedParams = (movies, savedMovies) => {
  const moviesWithSavedParams = [];
  movies.forEach((movie) => {
    const matchedMovie = savedMovies.find(savedMovie => savedMovie.movieId === movie.id)
    if (matchedMovie) {
      movie.isSaved = true;
      movie._id = matchedMovie._id;
    } else {
      movie.isSaved = false;
      movie._id = null;
    }
    moviesWithSavedParams.push(movie);
  })

  return moviesWithSavedParams;
}

// форматирует поля и содержание полей объекта фильма таким образом, чтобы его можно было добавить в базу
// сохранненых фильмов
export const formatMovieForSave = (movie, baseUrl) => {
  let {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    id: movieId,
    nameRU,
    nameEN,
  } = movie;

  image = `${baseUrl}${movie.image.url}`
  thumbnail = `${baseUrl}${movie.image.formats.thumbnail.url}`

  const formatedMovie = {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  };

  return formatedMovie;
}
