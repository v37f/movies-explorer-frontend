import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <fieldset className="filter-checkbox">
      <input className="filter-checkbox__input" type="checkbox" name="short-films" id="short-films" value="short-films" />
      <label className="filter-checkbox__label" for="short-films">Короткометражки</label>
    </fieldset>
  );
}

export default FilterCheckbox;
