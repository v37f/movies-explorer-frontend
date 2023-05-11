import { MAIN_BASE_URL } from './Constants';

class Api {
  constructor(options) {
   this._baseUrl = options.baseUrl;
   this._headers = options.headers;
  }

  _checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(res);
  };

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  sregister = (email, password, name) => {
    return fetch(`${MAIN_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    })
    .then(this._checkResponse);
  };

  register(email, password, name) {
    return this._request(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password, name })
    })
  }

  login(email, password) {
    return this._request(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password})
    })
  }

  setToken() {
    this._headers.authorization = `Bearer ${localStorage.getItem('jwt')}`
  };

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
        headers: this._headers
    })
  }
}

const mainApi = new Api({
  baseUrl: MAIN_BASE_URL,
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
});

export default mainApi;