import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <form className="search-form" action="#">
      <fieldset className="search-form__text-fieldset">
        <input 
          className="search-form__input" 
          type="text"
          id="movieTitle"
          name="movieTitle"
          placeholder="Фильм"
          noValidate
        />
        <button type="submit" className="search-form__button" />
      </fieldset>
      <FilterCheckbox />
    </form>
  );
}

export default SearchForm;