import {
  DragIcon,
  CurrencyIcon,
  DeleteIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { ingredients } from "../../utils/data";

import styles from "./burger-constructor.module.scss";

const BurgerConstructor = () => {
  return (
    <div className={styles.burgerConstructorContainer}>
      {ingredients.map(({ _id, image_mobile, name, price }, index) => {
        const classForFirstItem = index === 0 ? styles.ingredientFirstItem : "";
        const classForLastItem =
          index === ingredients.length - 1 ? styles.ingredientLastItem : "";

        return (
          <div key={_id} className={styles.ingredientWrapper}>
            <DragIcon type="primary" />

            <div
              className={`${styles.ingredientItem} ${classForFirstItem} ${classForLastItem}`}
            >
              <img src={image_mobile} alt="ingredientImage" />

              <p className="text text_type_main-default mr-5">{name}</p>

              <div style={{ display: "flex" }}>
                <div style={{ display: "flex" }} className="mr-5">
                  <span className="text text_type_digits-default mr-2">
                    {price}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>

                <DeleteIcon type="primary" />
              </div>
            </div>
          </div>
        );
      })}

      <div className={styles.checkoutSection}>
        <div className={styles.totalPrice}>
          <p className="text text_type_digits-medium mr-2">610</p>
          <CurrencyIcon type="primary" />
        </div>

        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
