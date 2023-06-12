import "./Form.css";


function Form({ children, onSubmit, formName, isLoading }) {
  return (
    <form action="#" className="form" onSubmit={onSubmit} name={formName} spellCheck="false"  >
      <fieldset className="form__text-inputs" disabled={isLoading}>
        {children}
      </fieldset>
    </form>
  );
}

export default Form;