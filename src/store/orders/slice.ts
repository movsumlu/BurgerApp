import { createSlice } from "@reduxjs/toolkit";
import { WebsocketStatus } from "types/interfaces";
import { TMessage, TSelectedOrder } from "./actions";

interface IOrdersState {
  status: WebsocketStatus;
  messages: TMessage | null;
  selectedOrder: TSelectedOrder | null;
  connectionError: string | null;
}

const initialState: IOrdersState = {
  status: WebsocketStatus.OFFLINE,
  messages: null,
  selectedOrder: null,
  connectionError: null,
};

const ordersSlice = createSlice({
  name: "ordersList",
  initialState,
  reducers: {
    wsConnection(state) {
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
      };
    },
    wsOpen(state) {
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
      };
    },
    wsClose(state) {
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
      };
    },
    wsConnectionError(state, action) {
      return {
        ...state,
        connectionError: action.payload,
      };
    },
    onSelectOrder(state, action) {
      return {
        ...state,
        selectedOrder: action.payload,
      };
    },
    wsGetMessages(state, action) {
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        messages: action.payload,
        error: null,
      };
    },
  },
});

export const {
  wsConnection,
  wsOpen,
  wsClose,
  wsConnectionError,
  wsGetMessages,
  onSelectOrder,
} = ordersSlice.actions;

export default ordersSlice.reducer;
