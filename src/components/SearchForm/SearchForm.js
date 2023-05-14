import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function SearchForm({ onSearchSubmit }) {
  const { values, handleChange, handleCheckboxChange } = useFormAndValidation({
    keyword: '',
    shortfilms: false,
  });

  console.log(values);

  function handleSearchClick(evt) {
    evt.preventDefault();
    onSearchSubmit();
  }
  return (
    <form className="search-form" action="#" onSubmit={handleSearchClick} >
      <fieldset className="search-form__text-fieldset">
        <input 
          className="search-form__input" 
          type="text"
          id="keyword"
          name="keyword"
          placeholder="Фильм"
          value={values.keyword || ''}
          onChange={handleChange}
        />
        <button type="submit" className="search-form__button" />
      </fieldset>
      <FilterCheckbox handleCheckboxChange={handleCheckboxChange} value={values.shortfilms} />
    </form>
  );
}

export default SearchForm;