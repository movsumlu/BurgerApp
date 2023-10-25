import PropTypes from "prop-types";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./style.module.scss";

interface IBurgerIngredientsItem {
  _id: string;
  image: string;
  price: number;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  image_mobile: string;
  image_large: string;
  __v: number;
}

const BurgerIngredientsItem = ({
  items,
}: {
  items: IBurgerIngredientsItem[];
}) => {
  return (
    <div className={styles.ingredientsBlock}>
      {items.map(({ _id, image, price, name }: IBurgerIngredientsItem) => {
        return (
          <div className={styles.ingredientsBlockItem} key={_id}>
            <Counter count={1} size="default" />
            <img src={image} alt="ingredientImage" />

            <div className={styles.ingredientPrice}>
              <span className="text text_type_digits-default mr-2">
                {price}
              </span>
              <CurrencyIcon type="primary" />
            </div>

            <p
              className={`${styles.ingredientText} text text_type_main-default`}
            >
              {name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

BurgerIngredientsItem.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BurgerIngredientsItem;
