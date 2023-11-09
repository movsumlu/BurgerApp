import { useMemo } from "react";
import { useSelector } from "react-redux";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDrag } from "react-dnd";

import { orderListSelector } from "store/orderList/selectors";

import { IBurgerIngredientsItem } from "types/interfaces";

import styles from "./style.module.scss";

const BurgerIngredientsItem = (props: {
  items: IBurgerIngredientsItem[];
  onSelectIngredient: (item: IBurgerIngredientsItem) => void;
}) => {
  const items = props.items;

  const { orderList } = useSelector(orderListSelector);

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

    orderList.forEach(({ _id }) => {
      const count = map.get(_id) || 0;
      map.set(_id, count + 1);
    });

    return map;
  }, [orderList]);

  return (
    <div className={styles.ingredientsBlock}>
      {items.map((item: IBurgerIngredientsItem) => {
        return (
          <div
            key={item._id}
            ref={drag}
            className={styles.ingredientsBlockItem}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            onClick={() => selectIngredient(item)}
          >
            {countMap.get(item._id) && (
              <Counter count={countMap.get(item._id)} size="default" />
            )}

            <img src={item.image} alt="ingredientImage" />

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

export default BurgerIngredientsItem;
