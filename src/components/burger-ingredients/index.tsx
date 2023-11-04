import { useState, useRef, useMemo, useContext } from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredientsItem from "components/burger-ingredients-item";
import Modal from "components/modal";
import IngredientDetails from "components/ingredient-details";

import { BurgerConstructorContext } from "services/burgerConstructorContext";

import { IBurgerIngredientsItem } from "types/interfaces";

import styles from "./style.module.scss";

const BurgerIngredients = () => {
  const { ingredients } = useContext(BurgerConstructorContext);

  const [selectedIngredient, setSelectedIngredient] =
    useState<IBurgerIngredientsItem | null>(null);

  const [selectedIngredientNav, setSelectedIngredientNav] =
    useState<string>("bun");

  const [viewModal, setViewModal] = useState<boolean>(false);

  const buns = useMemo(
    () => ingredients.filter(({ type }) => type === "bun"),
    [ingredients]
  );

  const sauces = useMemo(
    () => ingredients.filter(({ type }) => type === "sauce"),
    [ingredients]
  );

  const mains = useMemo(
    () => ingredients.filter(({ type }) => type === "main"),
    [ingredients]
  );

  const bunRef = useRef<HTMLHeadingElement | null>(null);
  const sauceRef = useRef<HTMLHeadingElement | null>(null);
  const mainRef = useRef<HTMLHeadingElement | null>(null);

  const ingredientTypes = [
    {
      name: "Булки",
      items: buns,
      ref: bunRef,
      value: "bun",
    },
    {
      name: "Соусы",
      items: sauces,
      ref: sauceRef,
      value: "sauce",
    },
    {
      name: "Начинки",
      items: mains,
      ref: mainRef,
      value: "main",
    },
  ];

  const onSelectIngredientNav = (value: string) => {
    setSelectedIngredientNav(value);

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

  const handleSelectIngredient = (
    ingredient: IBurgerIngredientsItem | null
  ) => {
    setSelectedIngredient(ingredient);
    setViewModal(true);
  };

  const handleCloseModal = () => {
    setViewModal(false);
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
              active={selectedIngredientNav === value}
              onClick={() => onSelectIngredientNav(value)}
            >
              {name}
            </Tab>
          );
        })}
      </div>

      <div className={styles.burgerIngredientsWrapper}>
        {ingredientTypes.map(({ name, ref, items }) => (
          <div key={name}>
            <h3 className="text text_type_main-medium mt-10" ref={ref}>
              {name}
            </h3>
            <div className={styles.burgerIngredientsBlock}>
              {items.map((item) => (
                <BurgerIngredientsItem
                  key={item._id}
                  items={[item]}
                  onSelectIngredient={handleSelectIngredient}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {viewModal && selectedIngredient && (
        <Modal headerText="Детали ингредиента" onClose={handleCloseModal}>
          <IngredientDetails selectedIngredient={selectedIngredient} />
        </Modal>
      )}
    </>
  );
};

export default BurgerIngredients;
