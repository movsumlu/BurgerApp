import { IBurgerIngredientsItem } from "types/interfaces";

export const swapArrayElements = (
  array: IBurgerIngredientsItem[],
  sourceIndex: number,
  targetIndex: number
) => {
  const tempArray = array[sourceIndex];

  array[sourceIndex] = array[targetIndex];
  array[targetIndex] = tempArray;

  return array;
};