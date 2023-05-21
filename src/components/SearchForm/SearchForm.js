import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ onSearchSubmit, keywordValue, shortfilmsValue, onKeywordChange, onShortfilmsChange }) {
  return (
    <form className="search-form" onSubmit={onSearchSubmit} >
      <fieldset className="search-form__text-fieldset">
        <input 
          className="search-form__input" 
          type="text"
          id="keyword"
          name="keyword"
          placeholder="Фильм"
          value={keywordValue || ''}
          onChange={onKeywordChange}
        />
        <button type="submit" className="search-form__button" />
      </fieldset>
      <FilterCheckbox onCheckboxChange={onShortfilmsChange} value={shortfilmsValue} />
    </form>
  );
}

export default SearchForm;