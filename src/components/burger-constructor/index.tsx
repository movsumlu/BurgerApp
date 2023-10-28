import { useState, useMemo } from "react";

import BurgerConstructorItem from "../burger-constructor-item";
import OrderDetails from "../order-details";
import Modal from "../modal";

import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { IBurgerIngredientsItem } from "../../types/interfaces";

import styles from "./style.module.scss";

const BurgerConstructor = (props: {
  ingredients: IBurgerIngredientsItem[];
}) => {
  const { ingredients } = props;

  const [viewModal, setViewModal] = useState(false);

  const totalPrice = useMemo(() => {
    return ingredients.reduce((acc, { price }) => acc + price, 0);
  }, [ingredients]);

  const checkoutOrder = () => {
    setViewModal(true);
  };

  const handleCloseModal = () => {
    setViewModal(false);
  };

  return (
    <div className={styles.burgerConstructorContainer}>
      <div className={styles.burgerConstructorItemWrapper}>
        {ingredients.map(({ _id, type, name, price, image_mobile }, index) => {
          return (
            <BurgerConstructorItem
              key={_id}
              isLocked={
                index === 0 || index === ingredients.length - 1 ? true : false
              }
              text={name}
              type={type as "bottom" | "top" | undefined}
              price={price}
              thumbnail={image_mobile}
            />
          );
        })}
      </div>

      <div className={styles.checkoutBlock}>
        <div className={styles.totalPrice}>
          <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>

        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={checkoutOrder}
        >
          Оформить заказ
        </Button>
      </div>

      {viewModal && (
        <Modal headerText="" onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
