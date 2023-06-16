import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import validators from '../../utils/Validators';
import "./Profile.css";

function Profile({ onSignOut, onUpdateUser, isFormDisabled, setIsFormDisabled, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, inputsErrors, isValid, formError, handleChange, onFocus, onBlur, resetForm } = useFormAndValidation({
    email: '',
    name: ''
  }, validators);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    resetForm({
      email: currentUser.email,
      name: currentUser.name
    }, {}, true);
  }, [currentUser, isFormDisabled, resetForm]);

  useEffect(() => {
    setIsButtonDisabled(true);
    for (let key in values) {
      if (values[key] !== currentUser[key]) {
        setIsButtonDisabled(false);
      } 
    } 
  }, [values, currentUser]);

  function handleEditClick() {
    setIsFormDisabled(!isFormDisabled);
  }

  function handleSaveClick(evt) {
    evt.preventDefault();
    onUpdateUser({
      email: values.email, 
      name: values.name
    });
  }

  return (
    <main className="profile">
      <div className="profile__container">
        <h2 className="profile__greetings">Привет, {currentUser?.name}!</h2>
        <form className="profile__form" action="#" name="profile-form" onSubmit={handleSaveClick} spellCheck="false" >
          <fieldset className="profile__form-fieldset" disabled={isFormDisabled || isLoading} >
            <label className="profile__form-label" htmlFor="name">
              <span className="profile__form-label-span">Имя</span>
              <input 
                className={"profile__form-input" + (inputsErrors.name ? " profile__form-input_invalid" : "")}
                type="text" 
                id="name" 
                name="name" 
                minLength="2" 
                maxLength="30"
                pattern="^[A-Za-zА-Яа-яЁё\s\-]+$"
                required 
                value={values.name || ''}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder="Введите имя" 
              />
            </label>
            <label className="profile__form-label" htmlFor="email">
              <span className="profile__form-label-span">E-mail</span>
              <input 
                className={"profile__form-input" + (inputsErrors.email ? " profile__form-input_invalid" : "")} 
                type="email" 
                id="email" 
                name="email" 
                required 
                value={values.email || ''}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder="Введите email" 
              />
            </label>
          </fieldset>
          {!isFormDisabled && 
            <span className={"profile__form-error" + (formError ? " profile__form-error_visible" : "")}>
              {formError}
            </span>
          }
          {!isFormDisabled && <button className="profile__form-button" type="submit" disabled={isButtonDisabled || !isValid} >Сохранить</button>}
        </form>
        {!isFormDisabled && <button className="profile__button profile__button_color_blue" type="button" onClick={handleEditClick} >Отмена</button>}
        {isFormDisabled && <button className="profile__button" type="button" onClick={handleEditClick} >Редактировать</button>}
        {isFormDisabled && <button className="profile__button profile__button_color_red" type="button" onClick={onSignOut} >Выйти из аккаунта</button>}
      </div>
    </main>
  );
}

export default Profile;
