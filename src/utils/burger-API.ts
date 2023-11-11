export const API_URL = "https://norma.nomoreparties.space";

export const checkResponse = (response: Response) =>
  response.ok
    ? response.json()
    : response.json().then((err) => Promise.reject(err));
