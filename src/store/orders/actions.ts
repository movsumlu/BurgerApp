import { IBurgerIngredientsItem } from "types/interfaces";
import { TOrderStatuses } from "utils/helper";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_CLOSE: "WS_CONNECTION_CLOSE" = "WS_CONNECTION_CLOSE";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";

export type TOrder = {
  ingredients: string[];
  _id: string;
  name: string;
  status: string;
  number: number;
  createdAt: Date;
  updatedAt: Date;
  price: number;
  __v: number;
};

export type TMessage = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TSelectedOrder = TOrder & {
  ingredients: IBurgerIngredientsItem[];
  totalPrice: number;
  status: TOrderStatuses;
};

export type StartAction = {
  type: typeof WS_CONNECTION_START;
  payload: string;
};

export type SuccessAction = {
  type: typeof WS_CONNECTION_SUCCESS;
};

export type ErrorAction = {
  type: typeof WS_CONNECTION_ERROR;
  payload: WebSocketEventMap;
};

export type ClosedAction = {
  type: typeof WS_CONNECTION_CLOSED;
};

export type GetAction = {
  type: typeof WS_GET_MESSAGE;
  payload: TMessage;
};

export type SendAction = {
  type: typeof WS_SEND_MESSAGE;
  payload: string;
};

export type TWSActions =
  | StartAction
  | SuccessAction
  | ErrorAction
  | ClosedAction
  | GetAction
  | SendAction;

export type TWSActionNames = {
  [key in TWSActions["type"]]: key;
};
