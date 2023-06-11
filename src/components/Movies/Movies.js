import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MovieCard from "../MovieCard/MovieCard";
import More from "../More/More";
import NoMovies from "../NoMovies/NoMovies";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { KEYWORD_REQUIRED_MESSAGE } from '../../utils/Constants';
import { useState, useEffect } from "react";

function Movies({ onSearchSubmit, movies, isLoading, noMoviesMessage, onSaveClick, onDeleteClick, isMoreButtonVisible, onMoreButtonClick }) {
  const { values, handleChange, handleCheckboxChange } = useFormAndValidation({
    keyword: localStorage.getItem("keyword") || '',
    shortfilms: JSON.parse(localStorage.getItem("shortfilms")) || false,
  });
  const [keywordError, setKeywordError] = useState('');
  // стейт isSearchButtonClicked нужен чтобы не допускать иницирование поиска нажатием на чекбокс короткометражек после изменения ключевого слова(keyword),
  // но до того как будет нажата кнопка поиска. Если поиск уже производился(а потом например страница была перезагружена), то значение keyword будет в localStorage, а 
  // оттуда попадет в values.keyword, засчет чего начальное значение isSearchButtonClicked установится в true
  const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(Boolean(values.keyword) || false);
 
  
  useEffect(() => {
    if (isSearchButtonClicked) {
      onSearchSubmit(values.keyword, values.shortfilms);
    }
  }, [values.shortfilms]);

  function handleKeywordChange(evt) {
    handleChange(evt);
    setIsSearchButtonClicked(false);
  }

  function handleSearchClick(evt) {
    evt.preventDefault();
    if (values.keyword) {
      setKeywordError('');
      onSearchSubmit(values.keyword, values.shortfilms);
      setIsSearchButtonClicked(true);
    } else {
      setKeywordError(KEYWORD_REQUIRED_MESSAGE);
    }
  }


  return (
    <div className="movies">
      <SearchForm 
        onSearchSubmit={handleSearchClick} 
        keywordValue={values.keyword} 
        shortfilmsValue={values.shortfilms} 
        onKeywordChange={handleKeywordChange}
        onShortfilmsChange={handleCheckboxChange}
        error={keywordError}
      />
      {movies.length === 0 
        ? <NoMovies isLoading={isLoading} message={noMoviesMessage} />
        : <> 
            <MoviesCardList>
              {movies.map(movie => (<MovieCard movie={movie} onSaveClick={onSaveClick} onDeleteClick={onDeleteClick} key={movie.id} />))}               
            </MoviesCardList>
            {isMoreButtonVisible && <More onMoreClick={onMoreButtonClick} />}
          </>
      }

    </div>
  );
}

export default Movies;
