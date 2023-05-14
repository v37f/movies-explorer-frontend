import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MovieCard/MoviesCard";
import More from "../More/More";

function Movies({ onSearchSubmit, movies }) {
  return (
    <div className="movies">
      <SearchForm onSearchSubmit={onSearchSubmit} movies={movies} />
      <MoviesCardList>
        {movies.map(movie => (
          <MoviesCard movie={movie} key={movie.id} />
        ))}
      </MoviesCardList>
      <More />
    </div>
  );
}

export default Movies;
