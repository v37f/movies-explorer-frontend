import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies() {
  return (
    <div className="saved-movies">
      <SearchForm />
      <MoviesCardList>
      </MoviesCardList>
      <div className="saved-movies__divider" />
    </div>
  );
}

export default SavedMovies;
