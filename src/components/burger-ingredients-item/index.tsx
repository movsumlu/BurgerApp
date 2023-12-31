import { useMemo } from "react";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDrag } from "react-dnd";

import { orderSelector } from "store/order/selectors";

import { useAppSelector } from "hooks/useAppSelector";

import { IBurgerIngredientsItem } from "types/interfaces";

import styles from "./style.module.scss";

interface IBurgerIngredientsItemProps {
  items: IBurgerIngredientsItem[];
  onSelectIngredient: (item: IBurgerIngredientsItem) => void;
}

export const BurgerIngredientsItem = (props: IBurgerIngredientsItemProps) => {
  const items = props.items;

  const { buns, ingredients } = useAppSelector(orderSelector);

  const selectIngredient = (item: IBurgerIngredientsItem) => {
    props.onSelectIngredient(item);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ingredient",
    item: items,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const countMap = useMemo(() => {
    const map = new Map();

    if (buns) {
      [buns, ...ingredients, buns].forEach(({ _id }) => {
        const count = map.get(_id) || 0;
        map.set(_id, count + 1);
      });
    }

    return map;
  }, [buns, ingredients]);

  const draggingOpacity = isDragging && styles.draggingOpacity;

  return (
    <div className={styles.ingredientsBlock}>
      {items.map((item: IBurgerIngredientsItem) => {
        return (
          <div
            key={item._id}
            ref={drag}
            className={`${styles.ingredientsBlockItem} ${draggingOpacity} ingredientsBlockItem`}
            onClick={() => selectIngredient(item)}
          >
            {countMap.get(item._id) && (
              <Counter count={countMap.get(item._id)} size="default" />
            )}

            <img src={item.image} alt={`Картинка ингредиента, ${item.image}`} />

            <div className={styles.ingredientPrice}>
              <span className="text text_type_digits-default mr-2">
                {item.price}
              </span>
              <CurrencyIcon type="primary" />
            </div>

            <p
              className={`${styles.ingredientText} text text_type_main-default`}
            >
              {item.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};
