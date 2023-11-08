import { useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredientsItem from "components/burger-ingredients-item";
import Modal from "components/modal";
import IngredientDetails from "components/ingredient-details";

import {
  displayIngredientModal,
  hideIngredientModal,
  selectIngredient,
} from "store/modal/slice";

import { ingredientsSelector } from "store/ingredients/selectors";
import { modalSelector } from "store/modal/selectors";

import { IBurgerIngredientsItem } from "types/interfaces";

import styles from "./style.module.scss";

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const { ingredients } = useSelector(ingredientsSelector);
  const { showIngredientModal, selectedIngredient } =
    useSelector(modalSelector);

  const [selectedIngredientNav, setSelectedIngredientNav] =
    useState<string>("bun");

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

  const handleSelectIngredient = (ingredient: IBurgerIngredientsItem) => {
    dispatch(selectIngredient(ingredient));
    dispatch(displayIngredientModal());
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

      {showIngredientModal && selectedIngredient && (
        <Modal
          headerText="Детали ингредиента"
          onClose={() => dispatch(hideIngredientModal())}
        >
          <IngredientDetails selectedIngredient={selectedIngredient} />
        </Modal>
      )}
    </>
  );
};

export default BurgerIngredients;
