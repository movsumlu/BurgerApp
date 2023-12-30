import { TOrderStatuses } from "utils/helper";

export interface IBurgerIngredientsItem {
  _id: string;
  image: string;
  price: number;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  image_mobile: string;
  image_large: string;
  __v: number;
  uuid: string;
  position?: "top" | "bottom";
}

export interface IOrder {
  ingredients: Array<string>;
  _id: string;
  status: TOrderStatuses;
  number: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  owner?: {
    createdAt: Date;
    updatedAt: Date;
    email: string;
    name: string;
  };
  __v: number;
}

export interface IOrder {
  ingredients: Array<string>;
  _id: string;
  status: TOrderStatuses;
  number: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  owner?: {
    createdAt: Date;
    updatedAt: Date;
    email: string;
    name: string;
  };
  __v: number;
}

export enum WebsocketStatus {
  CONNECTING = "CONNECTING...",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}
