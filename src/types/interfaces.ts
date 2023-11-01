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
  position?: "top" | "bottom";
}
