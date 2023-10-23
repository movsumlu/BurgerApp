import PropTypes from "prop-types";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients-item.module.scss";

const BurgerIngredientsItem = ({ items }: any) => {
  return (
    <div className={styles.ingredientsBlock}>
      {items.map((item: any) => {
        return (
          <div className={styles.ingredientsBlockItem} key={item._id}>
            <Counter count={1} size="default" extraClass={styles.counter} />
            <img src={item.image} alt="ingredientImage" />

            <div className={styles.price}>
              <span className="text text_type_digits-default mr-2">
                {item.price}
              </span>
              <CurrencyIcon type="primary" />
            </div>

            <p
              className="text text_type_main-default"
              style={{ textAlign: "center" }}
            >
              {item.name}
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
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    })
  ).isRequired,
};

export default BurgerIngredientsItem;
