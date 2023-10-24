import PropTypes from "prop-types";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./style.module.scss";

const BurgerIngredientsItem = ({ items }: any) => {
  return (
    <div className={styles.ingredientsBlock}>
      {items.map(({ _id, image, price, name }: any) => {
        return (
          <div className={styles.ingredientsBlockItem} key={_id}>
            <Counter count={1} size="default" extraClass={styles.counter} />
            <img src={image} alt="ingredientImage" />

            <div className={styles.price}>
              <span className="text text_type_digits-default mr-2">
                {price}
              </span>
              <CurrencyIcon type="primary" />
            </div>

            <p
              className="text text_type_main-default"
              style={{ textAlign: "center" }}
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
