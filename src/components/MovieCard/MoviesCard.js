import "./MoviesCard.css";
import imagePH from "../../images/movie-image-PH.png"
import { useState } from "react";
import { useLocation } from 'react-router-dom';

function MoviesCard() {
  const [isSaved, setIsSaved] = useState(false);
  const { pathname } = useLocation();

  const saveButtonClassName = ( 
    `movies-card__button movies-card__button_type_save ${isSaved && 'movies-card__button_active'}` 
  );

  function handleSaveClick() {
    setIsSaved(!isSaved);
  }
  
  return (
    <li className="movies-card">
      {
        pathname==="/movies" ?  
          <button className={saveButtonClassName} type="button" aria-label="Сохранить" onClick={handleSaveClick} /> :
          <button className="movies-card__button movies-card__button_type_delete" type="button" aria-label="Удалить" />
      }
      <img className="movies-card__image" src={imagePH} alt="НАЗВАНИЕ_ФИЛЬМА" />
      <div className="movies-card__text-container">
        <h2 className="movies-card__title">Gimme Danger: История Игги и The Stooges</h2>
        <p className="movies-card__duration">1ч 27м</p>
      </div>
    </li>
  );
}

export default MoviesCard;
