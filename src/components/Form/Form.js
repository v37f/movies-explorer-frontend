import "./Form.css";


function Form({ children }) {
  return (
    <form className="form">
      <fieldset className="form__text-inputs">
        {children}
      </fieldset>
    </form>
  );
}

export default Form;