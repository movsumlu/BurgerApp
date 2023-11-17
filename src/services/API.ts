export const API_URL = "https://norma.nomoreparties.space";

export const LOGIN_URL = `${API_URL}/api/auth/login`;
export const REGISTER_URL = `${API_URL}/api/auth/register`;
export const LOGOUT_URL = `${API_URL}/api/auth/logout`;
export const UPDATE_TOKEN_URL = `${API_URL}/api/auth/token`;

export const FORGOT_PASSWORD_URL = `${API_URL}/api/password-reset`;
export const RESET_PASSWORD_URL = `${API_URL}/api/password-reset/reset`;

export const checkResponse = (response: Response) =>
  response.ok
    ? response.json()
    : response.json().then((err) => Promise.reject(err));
