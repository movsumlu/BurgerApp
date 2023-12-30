import { AnyAction } from "redux";
import { TWSActionNames, TWSActions } from "store/orders/actions";

import {
  wsOpen,
  wsGetMessages,
  wsClose,
  wsConnectionError,
} from "store/orders/slice";

export const socketMiddleware = (wsActions: TWSActionNames) => {
  return (store: { dispatch: any }) => {
    let socket: any = null;

    return (next: (i: AnyAction) => void) => (action: TWSActions) => {
      const { dispatch } = store;

      if (action.type === wsActions.WS_CONNECTION_START) {
        socket = new WebSocket(action.payload);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(wsOpen());
        };

        socket.onmessage = (event: WebSocketEventMap & { data: string }) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch(wsGetMessages(parsedData));
        };

        socket.onclose = () => {
          dispatch(wsClose());
        };

        socket.onerror = (event: WebSocketEventMap) => {
          dispatch(wsConnectionError(event));
        };

        if (action.type === wsActions.WS_SEND_MESSAGE) {
          socket.send(JSON.stringify(action.payload));
        }
      }

      next(action);
    };
  };
};
