import { useState } from "react";
import "./Profile.css";

function Profile({ onSignOut }) {
  const userName = "Владимир"
  const email = "randim@yandex.ru"

  const [isFormDisabled, setIsFormDisabled] = useState(true)
  const isButtonDisabled = false;

  function handleEditClick() {
    setIsFormDisabled(!isFormDisabled);
  }

  return (
    <main className="profile">
      <div className="profile__container">
        <h2 className="profile__greetings">Привет, {userName}!</h2>
        <form className="profile__form" action="#" name="profile-form" onSubmit={handleEditClick} >
          <fieldset className="profile__form-fieldset" disabled={isFormDisabled} >
            <label className="profile__form-label" htmlFor="username">
              <span className="profile__form-label-span">Имя</span>
              <input 
                className="profile__form-input" 
                type="text" 
                id="username" 
                name="username" 
                minLength="2" 
                maxLength="30" 
                required 
                defaultValue={userName} 
                placeholder="Введите имя" 
              />
            </label>
            <label className="profile__form-label" htmlFor="email">
              <span className="profile__form-label-span">E-mail</span>
              <input 
                className="profile__form-input" 
                type="email" 
                id="email" 
                name="email" 
                required 
                defaultValue={email} 
                placeholder="Введите email" 
              />
            </label>
          </fieldset>
          {!isFormDisabled && 
            <span className={"profile__form-error" + (isButtonDisabled ? " profile__form-error_visible" : "")}>
              При обновлении профиля произошла ошибка.
            </span>
          }
          {!isFormDisabled && <button className="profile__form-button" type="submit" disabled={isButtonDisabled} >Сохранить</button>}
        </form>
        {isFormDisabled && <button className="profile__button" type="button" onClick={handleEditClick} >Редактировать</button>}
        {isFormDisabled && <button className="profile__button profile__button_color_red" type="button" onClick={onSignOut} >Выйти из аккаунта</button>}
      </div>
    </main>
  );
}

export default Profile;
