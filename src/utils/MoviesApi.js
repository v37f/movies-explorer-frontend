import { MOVIES_BASE_URL } from './Constants';

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};

export const getInitialMovies = () => {
  return fetch(`${MOVIES_BASE_URL}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
  .then(getResponse);
};