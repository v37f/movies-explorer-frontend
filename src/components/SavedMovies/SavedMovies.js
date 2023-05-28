import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MovieCard from "../MovieCard/MovieCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ movies, onDeleteClick }) {
  return (
    <div className="saved-movies">
      <SearchForm />
      <MoviesCardList>
        {movies.map(movie => (<MovieCard movie={movie} onDeleteClick={onDeleteClick} key={movie._id} />)).reverse()}
      </MoviesCardList>
      <div className="saved-movies__divider" />
    </div>
  );
}

export default SavedMovies;
