import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MovieCard/MoviesCard";
import More from "../More/More";
import NoMovies from "../NoMovies/NoMovies";

function Movies({ onSearchSubmit, movies, isLoading, noMoviesMessage }) {
  return (
    <div className="movies">
      <SearchForm onSearchSubmit={onSearchSubmit} movies={movies} />
      {movies.length === 0 
        ? <NoMovies isLoading={isLoading} message={noMoviesMessage} />
        : <> 
            <MoviesCardList>
              {movies.map(movie => (<MoviesCard movie={movie} key={movie.id} />))}
            </MoviesCardList>
            <More />
          </>
      }

    </div>
  );
}

export default Movies;
