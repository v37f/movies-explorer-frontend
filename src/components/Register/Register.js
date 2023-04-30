import FormContainer from "../FormContainer/FormContainer";
import Form from "../Form/Form";
import "./Register.css";

function Register() {

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
        <Form>
          <label className="form__input-label" htmlFor="username">Имя</label>
          <input 
            className={`form__input ${errors.userName ? ' form__input_invalid' : ''}`} 
            type="text" 
            id="username" 
            name="username" 
            defaultValue={values.userName} 
          />
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
          <span className={`form__input-error ${Object.keys(errors).length ? ' form__input-error_visible' : ''}`}>Что-то пошло не так... </span>
          <button className="form__submit" type="submit">Зарегистрироваться</button>
        </Form>
      </FormContainer>
    </main>
  );
}

export default Register;