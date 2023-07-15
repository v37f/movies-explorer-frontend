import {useState, useCallback} from 'react';

export function useFormAndValidation(defaultValues, validators) {
  
  const [ values, setValues ] = useState(defaultValues);
  const [ inputsErrors, setInputsErrors ] = useState({});
  const [ formError, setFormError] = useState('');
  const [ isValid, setIsValid ] = useState(false);

  const onFocus = (e) => {
    const { name } = e.target;
    setFormError(inputsErrors[name]);
  }

  const onBlur = () => {
    setFormError('');
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]: value });
    // валидация происходит только если переданы валидаторы
    if (validators) {
      const validationResult = checkInputValidity(name, value, validators);
      setInputsErrors({...inputsErrors, [name]: validationResult});
      setFormError(validationResult);
      setIsValid(checkFormValidity(e.target.closest('form'), validators));
    }
  };
  
  function checkInputValidity(inputName, inputValue, validators) {
    // проходим по каждому правилу валидатора для конкретного инпута, если ошибки нет валидатор возравщает пустую строку если ошибка есть,
    // возвращается текст ошибки
    for (const rule in validators[inputName]) {
      const error = validators[inputName][rule](inputValue);
      if (error) {
        // если в результате валидация вернулся текст ошибки, функции вернет его и 
        // прекратит проверку по оставшимся правилам валидации 
        return error;
      }
    }
    // если после прохрда по всем правилам ошибок валидации нет, вернется пустая строка
    return '';
  }
  
  function checkFormValidity(formNode, validators) {
    const { elements } = formNode;
    // проверяем наличие хотя бы однного невалидного инпута, для чего создаем массив всех элементов формы
    const hasInvalidInput = Array.from(elements)
      // из всех элементов формы нужны только инпуты, и т.к. только у них есть непустой аттрибут name фильтруем по нему
      .filter((element) => !!element.name)
      // проходим по массиву инпутов и валидируем каждый, если валидации вернет ошибку, то обоход массива прекратится и функция
      // checkFormValidity вернет false
      .some((input) => {
        const { name, value } = input;
        return !!checkInputValidity(name, value, validators);
      })
    return !hasInvalidInput;
  }

  const handleCheckboxChange = (e) => {
    const {name} = e.target
    setValues({...values, [name]: e.target.checked });
  }

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setInputsErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setInputsErrors, setIsValid]);

  return { values, inputsErrors, formError, isValid, handleChange, handleCheckboxChange, onFocus, onBlur, resetForm, setValues, setIsValid };
}

