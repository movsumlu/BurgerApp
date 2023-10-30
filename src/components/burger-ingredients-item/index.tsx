import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { IBurgerIngredientsItem } from "../../types/interfaces";

import styles from "./style.module.scss";

const BurgerIngredientsItem = (props: {
  items: IBurgerIngredientsItem[];
  onSelectIngredient: (item: IBurgerIngredientsItem) => void;
}) => {
  const items = props.items;

  const selectIngredient = (item: IBurgerIngredientsItem) => {
    props.onSelectIngredient(item);
  };

  return (
    <div className={styles.ingredientsBlock}>
      {items.map((item: IBurgerIngredientsItem) => {
        return (
          <div
            className={styles.ingredientsBlockItem}
            key={item._id}
            onClick={() => selectIngredient(item)}
          >
            <Counter count={1} size="default" />
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
