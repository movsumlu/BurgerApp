import { useState, useRef } from "react";

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

  const bunRef = useRef<HTMLHeadingElement | null>(null);
  const sauceRef = useRef<HTMLHeadingElement | null>(null);
  const mainRef = useRef<HTMLHeadingElement | null>(null);

  const onSelectedIngredient = (value: string) => {
    setSelectedIngredient(value);

    if (value === "bun" && bunRef.current) {
      bunRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (value === "sauce" && sauceRef.current) {
      sauceRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (value === "main" && mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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
              onClick={() => onSelectedIngredient(value)}
            >
              {name}
            </Tab>
          );
        })}
      </div>

      <div className={styles.burgerIngredientsWrapper}>
        <h3 className="text text_type_main-medium mt-10" ref={bunRef}>
          Булки
        </h3>
        <BurgerIngredientsItem items={buns} />

        <h3 className="text text_type_main-medium" ref={sauceRef}>
          Соусы
        </h3>
        <BurgerIngredientsItem items={sauces} />

        <h3 className="text text_type_main-medium" ref={mainRef}>
          Начинки
        </h3>
        <BurgerIngredientsItem items={mains} />
      </div>
    </>
  );
};

export default BurgerIngredients;
