import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ onSearchSubmit }) {
  return (
    <form className="search-form" action="#" onSubmit={onSearchSubmit}>
      <fieldset className="search-form__text-fieldset">
        <input 
          className="search-form__input" 
          type="text"
          id="movieTitle"
          name="movieTitle"
          placeholder="Фильм"
        />
        <button type="submit" className="search-form__button" />
      </fieldset>
      <FilterCheckbox />
    </form>
  );
}

export default SearchForm;