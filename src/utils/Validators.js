import isEmail from 'validator/lib/isEmail';
import { NAME_PATTERN } from './Constants';

const validators = {
  name: {
    required: (value) => !value ? `Поле "Имя" должно быть заполнено` : '',
    minLength: (value) => value.length < 2 ? `Поле "Имя" должно содержать не менее 2 символов` : '',
    maxLength: (value) => value.length > 30 ?  `Поле "Имя" должно содержать не более 30 символов` : '',
    pattern: (value) => !NAME_PATTERN.test(value) ? `Поле "Имя" должно содержать только латиницу, кириллицу, пробел или дефис` : '',
  },
  email: {
    required: (value) => !value ? `Поле "E-mail" должно быть заполнено` : '',
    isEmail: (value) => !isEmail(value) ? `Поле "E-mail" должно содержать валидный e-mail адрес` : '',
  },
  password: {
    required: (value) => !value ? `Поле "Пароль" должно быть заполнено` : '',
  },
}

export default validators;