export const API_URL = "https://norma.nomoreparties.space/api";

export const LOGIN_URL = `${API_URL}/auth/login`;
export const REGISTER_URL = `${API_URL}/auth/register`;
export const LOGOUT_URL = `${API_URL}/auth/logout`;
export const UPDATE_TOKEN_URL = `${API_URL}/auth/token`;
export const FORGOT_PASSWORD_URL = `${API_URL}/password-reset`;
export const RESET_PASSWORD_URL = `${API_URL}/password-reset/reset`;
export const FETCH_INGREDIENTS_URL = `${API_URL}/ingredients`;
export const FETCH_ORDER_URL = `${API_URL}/orders/`;

export const WS_ORDERS_BASE_URL = "wss://norma.nomoreparties.space/orders";
export const WS_ALL_ORDERS_URL = `${WS_ORDERS_BASE_URL}/all`;

export const checkOkResponse = (response: Response) => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(response);
};

export const checkSuccessResponse = (response: any): Promise<any> => {
  if (response.success) {
    return response;
  }

  return Promise.reject(response);
};
