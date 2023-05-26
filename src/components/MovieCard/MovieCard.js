import "./MovieCard.css";
import { MOVIES_BASE_URL } from '../../utils/Constants';
import { formatTime } from "../../utils/Utils";
import { useState } from "react";
import { useLocation } from 'react-router-dom';


function MoviesCard({ movie }) {
  const [isSaved, setIsSaved] = useState(false);
  const { pathname } = useLocation();

  const saveButtonClassName = ( 
    `movie-card__button movie-card__button_type_save ${isSaved && 'movie-card__button_saved'}` 
  );

  function handleSaveClick() {
    setIsSaved(!isSaved);
  }
  
  return (
    <li className="movie-card">
      {
          pathname==="/movies" ?  
            <button className={saveButtonClassName} type="button" aria-label="Сохранить" onClick={handleSaveClick} /> :
            <button className="movie-card__button movie-card__button_type_delete" type="button" aria-label="Удалить" />
      }
      <a className="movie-card__trailer-link" href={`${movie.trailerLink}`} target="_blank" rel="noreferrer" title="Смотреть трейлер">
        <img className="movie-card__image" src={`${MOVIES_BASE_URL}${movie.image.url}`} alt={movie.nameRU} />
        <div className="movie-card__text-container">
          <h2 className="movie-card__title">{movie.nameRU}</h2>
          <p className="movie-card__duration">{formatTime(movie.duration)}</p>
        </div>
      </a>
    </li>
  );
}

export default MoviesCard;
