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
      method: 'GET',
      headers: this._headers
    })
  }

  updateUserInfo({ email, name }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ email, name })
    })
  }

  getSavedMovies() {
    return this._request(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._headers
    })
  }

  saveMovie(movie) {
    return this._request(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(movie)
    })
  }

  deleteMovie(movieId) {
    return this._request(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
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