import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";

import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { orderList } from "../../utils/order-list";

import styles from "./style.module.scss";

const BurgerConstructor = () => {
  return (
    <div className={styles.burgerConstructorContainer}>
      {orderList.map(({ id, isLocked, type, name, price, image_mobile }) => {
        return (
          <BurgerConstructorItem
            key={id}
            isLocked={isLocked ?? false}
            text={name}
            type={type as "bottom" | "top" | undefined}
            price={price}
            thumbnail={image_mobile}
          />
        );
      })}

      <div className={styles.checkoutBlock}>
        <div className={styles.totalPrice}>
          <p className="text text_type_digits-medium mr-2">610</p>
          <CurrencyIcon type="primary" />
        </div>

        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
