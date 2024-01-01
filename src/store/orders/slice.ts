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
    WS_CONNECTION_START(state) {
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
      };
    },
    WS_CONNECTION_SUCCESS(state) {
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
      };
    },
    WS_CONNECTION_CLOSED(state) {
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
      };
    },
    WS_CONNECTION_ERROR(state, action) {
      return {
        ...state,
        connectionError: action.payload,
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
    onSelectOrder(state, action) {
      return {
        ...state,
        selectedOrder: action.payload,
      };
    },
  },
});

export const { wsGetMessages, onSelectOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
