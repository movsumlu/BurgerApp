import { useState } from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";

import { ingredients } from "../../utils/data";

const BurgerIngredients = () => {
  const [selectedIngredient, setSelectedIngredient] = useState("bun");

  const buns = ingredients.filter(({ type }) => type === "bun");
  const sauces = ingredients.filter(({ type }) => type === "sauce");
  const mains = ingredients.filter(({ type }) => type === "main");

  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">
        Соберите свой бургер
      </h1>

      <div style={{ display: "flex" }}>
        <Tab
          value="bun"
          active={selectedIngredient === "bun"}
          onClick={setSelectedIngredient}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={selectedIngredient === "sauce"}
          onClick={setSelectedIngredient}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={selectedIngredient === "main"}
          onClick={setSelectedIngredient}
        >
          Начинки
        </Tab>
      </div>

      <h3 className="text text_type_main-medium mt-10">Булки</h3>
      <BurgerIngredientsItem items={buns} />

      <h3 className="text text_type_main-medium">Соусы</h3>
      <BurgerIngredientsItem items={sauces} />

      <h3 className="text text_type_main-medium">Начинки</h3>
      <BurgerIngredientsItem items={mains} />
    </>
  );
};

export default BurgerIngredients;
