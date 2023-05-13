import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import "./Profile.css";

function Profile({ onSignOut, onUpdateUser, isFormDisabled, setIsFormDisabled }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm, setValues, setIsValid } = useFormAndValidation({
    email: '',
    name: ''
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    resetForm();
    setValues({
      ...values,
      email: currentUser.email,
      name: currentUser.name
    });
    setIsValid(true);
  }, [currentUser, isFormDisabled]);

  useEffect(() => {
    setIsButtonDisabled(true);
    for (let key in values) {
      if (values[key] !== currentUser[key]) {
        setIsButtonDisabled(false);
      } 
    } 
  }, [values]);

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
        <form className="profile__form" action="#" name="profile-form" onSubmit={handleSaveClick} >
          <fieldset className="profile__form-fieldset" disabled={isFormDisabled} >
            <label className="profile__form-label" htmlFor="name">
              <span className="profile__form-label-span">Имя</span>
              <input 
                className="profile__form-input" 
                type="text" 
                id="name" 
                name="name" 
                minLength="2" 
                maxLength="30" 
                required 
                value={values.name || ''}
                onChange={handleChange}
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
                value={values.email || ''}
                onChange={handleChange}
                placeholder="Введите email" 
              />
            </label>
          </fieldset>
          {!isFormDisabled && 
            <span className={"profile__form-error" + (Object.keys(errors).length ? " profile__form-error_visible" : "")}>
              {errors.name || errors.email}
            </span>
          }
          {!isFormDisabled && <button className="profile__form-button" type="submit" disabled={isButtonDisabled || !isValid} >Сохранить</button>}
        </form>
        {isFormDisabled && <button className="profile__button" type="button" onClick={handleEditClick} >Редактировать</button>}
        {isFormDisabled && <button className="profile__button profile__button_color_red" type="button" onClick={onSignOut} >Выйти из аккаунта</button>}
      </div>
    </main>
  );
}

export default Profile;
