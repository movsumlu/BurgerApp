import { useState, useRef, useMemo } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { BurgerIngredientsItem } from "components/burger-ingredients-item";

import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";

import {
  selectIngredient,
  displayIngredientModal,
} from "store/ingredients/slice";

import { ingredientsSelector } from "store/ingredients/selectors";

import { IBurgerIngredientsItem } from "types/interfaces";

import styles from "./style.module.scss";

export const BurgerIngredients = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const { ingredients } = useAppSelector(ingredientsSelector);

  const [selectedIngredientNav, setSelectedIngredientNav] = useState("bun");

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

  const ingredientsNavWrapperRef = useRef<HTMLDivElement | null>(null);

  const bunRef = useRef<HTMLDivElement | null>(null);
  const sauceRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

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

    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location },
      replace: true,
    });
  };

  const handleOnScroll = () => {
    if (
      ingredientsNavWrapperRef.current &&
      bunRef.current &&
      sauceRef.current &&
      mainRef.current
    ) {
      const bunDistance = Math.abs(
        ingredientsNavWrapperRef.current.getBoundingClientRect().top -
          bunRef.current.getBoundingClientRect().top
      );

      const sauceDistance = Math.abs(
        ingredientsNavWrapperRef.current.getBoundingClientRect().top -
          sauceRef.current.getBoundingClientRect().top
      );

      const mainDistance = Math.abs(
        ingredientsNavWrapperRef.current.getBoundingClientRect().top -
          mainRef.current.getBoundingClientRect().top
      );

      const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);

      const currentHeader =
        minDistance === bunDistance
          ? "bun"
          : minDistance === sauceDistance
          ? "sauce"
          : "main";

      setSelectedIngredientNav(currentHeader);
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
              active={selectedIngredientNav === value}
              onClick={() => onSelectIngredientNav(value)}
            >
              {name}
            </Tab>
          );
        })}
      </div>

      <div
        ref={ingredientsNavWrapperRef}
        className={styles.burgerIngredientsWrapper}
        onScroll={handleOnScroll}
      >
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
    </>
  );
};
