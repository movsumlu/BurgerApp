import { useState } from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";

import { ingredients } from "../../utils/ingredients";

import styles from "./style.module.scss";

const BurgerIngredients = () => {
  const [selectedIngredient, setSelectedIngredient] = useState("bun");

  const buns = ingredients.filter(({ type }) => type === "bun");
  const sauces = ingredients.filter(({ type }) => type === "sauce");
  const mains = ingredients.filter(({ type }) => type === "main");

  const ingredientTypes = [
    {
      name: "Булки",
      value: "bun",
    },
    {
      name: "Соусы",
      value: "sauce",
    },
    {
      name: "Начинки",
      value: "main",
    },
  ];

  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">
        Соберите свой бургер
      </h1>

      <div className={styles.burgerIngredientsNavWrapper}>
        {ingredientTypes.map(({ name, value }) => {
          return (
            <Tab
              key={value}
              value={value}
              active={selectedIngredient === value}
              onClick={() => {
                setSelectedIngredient(value);
              }}
            >
              {name}
            </Tab>
          );
        })}
      </div>

      <div className={styles.burgerIngredientsWrapper}>
        <h3 className="text text_type_main-medium mt-10">Булки</h3>
        <BurgerIngredientsItem items={buns} />

        <h3 className="text text_type_main-medium">Соусы</h3>
        <BurgerIngredientsItem items={sauces} />

        <h3 className="text text_type_main-medium">Начинки</h3>
        <BurgerIngredientsItem items={mains} />
      </div>
    </>
  );
};

export default BurgerIngredients;
