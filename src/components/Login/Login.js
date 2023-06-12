import FormContainer from "../FormContainer/FormContainer";
import Form from "../Form/Form";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import validators from '../../utils/Validators';
import "./Login.css";

function Login({ handleLogin, isLoading }) {

  const { values, inputsErrors, formError, isValid, handleChange, onFocus, onBlur } = useFormAndValidation({
    email: '',
    password: ''
  }, validators);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(values.email, values.password);
  }

  return (
    <main className="login">
      <FormContainer title="Рады видеть!" text="Ещё не зарегистрированы?" linkText="Регистрация" linkPath="/signup" >
        <Form onSubmit={handleSubmit} formName="login-form" isLoading={isLoading} >
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
          <span className={`form__input-error form__input-error_type_login ${formError ? ' form__input-error_visible' : ''}`}>
            {formError}
          </span>
          <button className="form__submit" type="submit" disabled={!isValid}>Войти</button>
        </Form>
      </FormContainer>
    </main>
  );
}

export default Login;