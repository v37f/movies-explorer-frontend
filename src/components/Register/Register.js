import FormContainer from "../FormContainer/FormContainer";
import Form from "../Form/Form";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import "./Register.css";

function Register({ handleRegister }) {

  const { values, handleChange, errors, isValid } = useFormAndValidation({
    email: '',
    password: '',
    username: ''
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(values.email, values.password, values.username);
  }

  return (
    <main className="register">
      <FormContainer title="Добро пожаловать!" text="Уже зарегистрированы?" linkText="Войти" linkPath="/signin" >
        <Form onSubmit={handleSubmit} formName="register-form" >
          <label className="form__input-label" htmlFor="username">Имя</label>
          <input 
            className={`form__input ${errors.username ? ' form__input_invalid' : ''}`} 
            type="text" 
            id="username" 
            name="username" 
            minLength="2" 
            maxLength="30" 
            pattern="[A-Za-zА-Яа-яЁё\s\-]*"
            required 
            placeholder="Введите имя" 
            value={values.username || ''}
            onChange={handleChange}
          />
          <label className="form__input-label" htmlFor="email">E-mail</label>
          <input 
            className={`form__input ${errors.email ? ' form__input_invalid' : ''}`} 
            type="email" 
            id="email" 
            name="email" 
            required 
            placeholder="Введите email" 
            value={values.email || ''}
            onChange={handleChange}
          />
          <label className="form__input-label" htmlFor="password">Пароль</label>
          <input 
            className={`form__input ${errors.password ? ' form__input_invalid' : ''}`} 
            type="password" 
            id="password" 
            name="password" 
            required 
            placeholder="Введите пароль" 
            value={values.password || ''}
            onChange={handleChange}
          />
          <span className={`form__input-error ${Object.keys(errors).length ? ' form__input-error_visible' : ''}`}>{errors.username || errors.email || errors.password}</span>
          <button className="form__submit" type="submit" disabled={!isValid}>Зарегистрироваться</button>
        </Form>
      </FormContainer>
    </main>
  );
}

export default Register;