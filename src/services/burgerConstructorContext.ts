import { createContext } from "react";

import { IBurgerIngredientsItem } from "types/interfaces";

type BurgerConstructorContextType = {
  ingredients: IBurgerIngredientsItem[];
};

export const BurgerConstructorContext =
  createContext<BurgerConstructorContextType>({ ingredients: [] });
