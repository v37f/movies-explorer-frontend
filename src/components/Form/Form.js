import "./Form.css";


function Form({ children, onSubmit, formName}) {
  return (
    <form action="#" className="form" onSubmit={onSubmit} name={formName} spellCheck="false">
      <fieldset className="form__text-inputs">
        {children}
      </fieldset>
    </form>
  );
}

export default Form;