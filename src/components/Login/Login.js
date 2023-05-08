import FormContainer from "../FormContainer/FormContainer";
import Form from "../Form/Form";
import "./Login.css";

function Login({ onSubmit }) {

  const values = {
    email: "random@random.ru",
    password: "verystrongpassword"
  }
  
  const errors = {
    // password: "not so strong",
  }


  return (
    <main className="login">
      <FormContainer title="Рады видеть!" text="Ещё не зарегистрированы?" linkText="Регистрация" linkPath="/signup" >
        <Form onSubmit={onSubmit} formName="register-form">
          <label className="form__input-label" htmlFor="email">E-mail</label>
          <input 
            className={`form__input ${errors.email ? ' form__input_invalid' : ''}`} 
            type="email" 
            id="email" 
            name="email" 
            defaultValue={values.email} 
          />
          <label className="form__input-label" htmlFor="password">Пароль</label>
          <input 
            className={`form__input ${errors.password ? ' form__input_invalid' : ''}`} 
            type="password" 
            id="password" 
            name="password" 
            defaultValue={values.password} 
          />
          <span className={`form__input-error form__input-error_type_login ${Object.keys(errors).length ? ' form__input-error_visible' : ''}`}>Что-то пошло не так... </span>
          <button className="form__submit" type="submit">Войти</button>
        </Form>
      </FormContainer>
    </main>
  );
}

export default Login;