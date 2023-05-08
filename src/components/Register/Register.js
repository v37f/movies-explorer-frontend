import FormContainer from "../FormContainer/FormContainer";
import Form from "../Form/Form";
import "./Register.css";

function Register({ onSubmit }) {

  const values = {
    userName: "Владимир",
    email: "random@random.ru",
    password: "verystrongpassword"
  }
  
  const errors = {
    password: "not so strong",
  }


  return (
    <main className="register">
      <FormContainer title="Добро пожаловать!" text="Уже зарегистрированы?" linkText="Войти" linkPath="/signin" >
        <Form onSubmit={onSubmit} formName="register-form" >
          <label className="form__input-label" htmlFor="username">Имя</label>
          <input 
            className={`form__input ${errors.userName ? ' form__input_invalid' : ''}`} 
            type="text" 
            id="username" 
            name="username" 
            minLength="2" 
            maxLength="30" 
            required 
            defaultValue={values.userName}
            placeholder="Введите имя" 
          />
          <label className="form__input-label" htmlFor="email">E-mail</label>
          <input 
            className={`form__input ${errors.email ? ' form__input_invalid' : ''}`} 
            type="email" 
            id="email" 
            name="email" 
            required 
            defaultValue={values.email} 
            placeholder="Введите email" 
          />
          <label className="form__input-label" htmlFor="password">Пароль</label>
          <input 
            className={`form__input ${errors.password ? ' form__input_invalid' : ''}`} 
            type="password" 
            id="password" 
            name="password" 
            required 
            defaultValue={values.password} 
            placeholder="Введите пароль" 
          />
          <span className={`form__input-error ${Object.keys(errors).length ? ' form__input-error_visible' : ''}`}>Что-то пошло не так... </span>
          <button className="form__submit" type="submit">Зарегистрироваться</button>
        </Form>
      </FormContainer>
    </main>
  );
}

export default Register;