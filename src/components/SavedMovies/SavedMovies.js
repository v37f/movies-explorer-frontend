import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MovieCard from "../MovieCard/MovieCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import NoMovies from "../NoMovies/NoMovies";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useEffect } from "react";

function SavedMovies({ onSearchSubmit, movies, onDeleteClick, noSavedMoviesMessage }) {
  const { values, handleChange, handleCheckboxChange } = useFormAndValidation({
    keyword: '',
    shortfilms: false,
  });

  useEffect(() => {
    onSearchSubmit(values.keyword, values.shortfilms);
  }, [values.shortfilms]);

  function handleSearchClick(evt) {
    evt.preventDefault();
    onSearchSubmit(values.keyword, values.shortfilms);
  }
  
  return (
    <div className="saved-movies">
      <SearchForm         
        onSearchSubmit={handleSearchClick} 
        keywordValue={values.keyword} 
        shortfilmsValue={values.shortfilms} 
        onKeywordChange={handleChange}
        onShortfilmsChange={handleCheckboxChange}/>
      {movies.length === 0 
        ? <NoMovies isLoading={false} message={noSavedMoviesMessage} />
        : <MoviesCardList>
            {movies.map(movie => (<MovieCard movie={movie} onDeleteClick={onDeleteClick} key={movie._id} />)).reverse()}
          </MoviesCardList>
      }
      <div className="saved-movies__divider" />
    </div>
  );
}

export default SavedMovies;
