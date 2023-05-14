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