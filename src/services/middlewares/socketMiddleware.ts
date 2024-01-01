import { AnyAction, Middleware, MiddlewareAPI } from "redux";

import { AppDispatch, RootState } from "store";
import { TWSActionNames, TWSActions } from "store/orders/actions";

export const socketMiddleware = (wsActions: TWSActionNames): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next: (i: AnyAction) => void) => (action: TWSActions) => {
      const { dispatch } = store;

      if (action.type === wsActions.WS_CONNECTION_START) {
        socket = new WebSocket(action.payload);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: wsActions.WS_CONNECTION_SUCCESS });
        };

        socket.onmessage = (event) => {
          const { data } = event;

          const parsedData = JSON.parse(data);

          dispatch({ type: wsActions.WS_GET_MESSAGE, payload: parsedData });
        };

        socket.onclose = () => {
          dispatch({ type: wsActions.WS_CONNECTION_CLOSED });
        };

        socket.onerror = (event) => {
          dispatch({ type: wsActions.WS_CONNECTION_ERROR, payload: event });
        };

        if (action.type === wsActions.WS_SEND_MESSAGE) {
          socket.send(JSON.stringify(action.payload));
        }
      }

      next(action);
    };
  };
};
