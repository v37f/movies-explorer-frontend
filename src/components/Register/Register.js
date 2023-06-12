import FormContainer from "../FormContainer/FormContainer";
import Form from "../Form/Form";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import validators from '../../utils/Validators';
import "./Register.css";

function Register({ handleRegister, isLoading }) {

  const { values, inputsErrors,  formError, isValid, handleChange, onFocus, onBlur } = useFormAndValidation({
    email: '',
    password: '',
    name: ''
  }, validators);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(values.email, values.password, values.name);
  }

  return (
    <main className="register">
      <FormContainer title="Добро пожаловать!" text="Уже зарегистрированы?" linkText="Войти" linkPath="/signin" >
        <Form onSubmit={handleSubmit} formName="register-form" isLoading={isLoading} >
          <label className="form__input-label" htmlFor="name">Имя</label>
          <input 
            className={`form__input ${inputsErrors.name ? ' form__input_invalid' : ''}`} 
            type="text" 
            id="name" 
            name="name" 
            minLength="2" 
            maxLength="30" 
            pattern="^[A-Za-zА-Яа-яЁё\s\-]+$"
            required 
            placeholder="Введите имя" 
            value={values.name || ''}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <label className="form__input-label" htmlFor="email">E-mail</label>
          <input 
            className={`form__input ${inputsErrors.email ? ' form__input_invalid' : ''}`} 
            type="email" 
            id="email" 
            name="email" 
            required 
            placeholder="Введите email" 
            value={values.email || ''}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <label className="form__input-label" htmlFor="password">Пароль</label>
          <input 
            className={`form__input ${inputsErrors.password ? ' form__input_invalid' : ''}`} 
            type="password" 
            id="password" 
            name="password" 
            required 
            placeholder="Введите пароль" 
            value={values.password || ''}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <span className={`form__input-error ${formError ? ' form__input-error_visible' : ''}`}>
            {formError}
          </span>
          <button className="form__submit" type="submit" disabled={!isValid}>Зарегистрироваться</button>
        </Form>
      </FormContainer>
    </main>
  );
}

export default Register;