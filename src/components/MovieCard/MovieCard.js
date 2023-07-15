import "./MovieCard.css";
import { MOVIES_BASE_URL } from '../../utils/Constants';
import { formatTime } from "../../utils/Utils";
import { useLocation } from 'react-router-dom';


function MovieCard({ movie, onSaveClick, onDeleteClick }) {
  const { pathname } = useLocation();

  const saveButtonClassName = ( 
    `movie-card__button movie-card__button_type_save ${movie.isSaved && 'movie-card__button_saved'}` 
  );

  function handleSaveClick() {
    onSaveClick(movie);
  }

  function handleDeleteClick() {
    onDeleteClick(movie);
  }
  
  return (
    <li className="movie-card">
      {
          pathname==="/movies" ?  
            <button className={saveButtonClassName} type="button" aria-label="Сохранить" onClick={movie.isSaved ? handleDeleteClick : handleSaveClick} /> :
            <button className="movie-card__button movie-card__button_type_delete" type="button" aria-label="Удалить" onClick={handleDeleteClick} />
      }
      <a className="movie-card__trailer-link" href={`${movie.trailerLink}`} target="_blank" rel="noreferrer" title="Смотреть трейлер">
        <img 
          className="movie-card__image" 
          src={ pathname==="/movies" 
                ? `${MOVIES_BASE_URL}${movie.image.url}`
                : `${movie.image}`
              } 
          alt={movie.nameRU} 
        />
        <div className="movie-card__text-container">
          <h2 className="movie-card__title">{movie.nameRU}</h2>
          <p className="movie-card__duration">{formatTime(movie.duration)}</p>
        </div>
      </a>
    </li>
  );
}

export default MovieCard;
