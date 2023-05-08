import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./FormContainer.css";


function FormContainer({ children, title, text, linkText, linkPath }) {
  return (
    <section className="form-container">
      <div className="form-container__logo">
        <Logo />
      </div>
      <h2 className="form-container__title">{title}</h2>
      {children}
      <p className="form-container__text">
        {text}&nbsp;
        <Link className="form-container__link-text" to={linkPath}>{linkText}</Link>
      </p>
      
    </section>
  );
}

export default FormContainer;