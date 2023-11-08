import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerConstructorItem from "components/burger-constructor-item";
import OrderDetails from "components/order-details";
import Modal from "components/modal";

import { ingredientsSelector } from "store/ingredients/selectors";
import { modalSelector } from "store/modal/selectors";

import { AppDispatch } from "store";

import {
  checkoutOrder,
  displayOrderModal,
  hideOrderModal,
} from "store/modal/slice";

import { IBurgerIngredientsItem } from "types/interfaces";

import styles from "./style.module.scss";

const BurgerConstructor = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { ingredients } = useSelector(ingredientsSelector);
  const { showOrderModal, order } = useSelector(modalSelector);

  const totalPrice = useMemo(
    () => ingredients.reduce((acc, { price }) => acc + price, 0),
    [ingredients]
  );

  const filteredIngredients: IBurgerIngredientsItem[] = useMemo(() => {
    const bun = ingredients.find(({ type }) => type === "bun");

    if (!bun) return [...ingredients];

    const ingredientsWithoutBuns = ingredients.filter(
      ({ type }) => type !== "bun"
    );

    return [
      { ...bun, position: "top" },
      ...ingredientsWithoutBuns,
      { ...bun, position: "bottom" },
    ];
  }, [ingredients]);

  const IDOfIngredients = useMemo(
    () => filteredIngredients.map(({ _id }) => _id),
    [filteredIngredients]
  );

  const checkoutOrderHandler = () => {
    dispatch(checkoutOrder(IDOfIngredients));
    dispatch(displayOrderModal());
  };

  return (
    <div className={styles.burgerConstructorContainer}>
      <div className={styles.burgerConstructorItemWrapper}>
        {filteredIngredients.map(
          ({ type, name, price, image_mobile }, index) => {
            return (
              <BurgerConstructorItem
                key={index}
                isLocked={
                  index === 0 || index === ingredients.length - 1 ? true : false
                }
                text={name}
                type={type as "bottom" | "top" | undefined}
                price={price}
                thumbnail={image_mobile}
              />
            );
          }
        )}
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
          onClick={checkoutOrderHandler}
        >
          Оформить заказ
        </Button>
      </div>

      {showOrderModal && (
        <Modal onClose={() => dispatch(hideOrderModal())}>
          <OrderDetails orderNumber={order && order.number} />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
