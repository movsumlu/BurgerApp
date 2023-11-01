import { useState, useMemo, useContext } from "react";

import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerConstructorItem from "../burger-constructor-item";
import OrderDetails from "../order-details";
import Modal from "../modal";

import { apiURL } from "../../consts";
import { IBurgerIngredientsItem } from "../../types/interfaces";
import { BurgerConstructorContext } from "../../services/burgerConstructorContext";
import { checkResponse } from "../../utils/burger-API";

import styles from "./style.module.scss";

const BurgerConstructor = () => {
  const { ingredients } = useContext(BurgerConstructorContext);

  const [viewModal, setViewModal] = useState(false);
  const [hasErrorsWithFetching, setHasErrorsWithFetching] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const totalPrice = useMemo(
    () => ingredients.reduce((acc, { price }) => acc + price, 0),
    [ingredients]
  );

  const filteredIngredients: IBurgerIngredientsItem[] = useMemo(() => {
    const bun = ingredients.find(({ type }) => type === "bun");

    const ingredientsWithoutBuns = ingredients.filter(
      ({ type }) => type !== "bun"
    );

    return bun
      ? [
          { ...bun, position: "top" },
          ...ingredientsWithoutBuns,
          { ...bun, position: "bottom" },
        ]
      : [...ingredientsWithoutBuns];
  }, [ingredients]);

  const IDOfIngredients = useMemo(
    () => filteredIngredients.map((ingredient) => ingredient._id),
    [filteredIngredients]
  );

  const checkoutOrder = () => {
    fetch(`${apiURL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: IDOfIngredients }),
    })
      .then(checkResponse)
      .then(({ order }) => {
        setOrderNumber(order.number);
        setViewModal(true);
      })
      .catch((error) => {
        setHasErrorsWithFetching(true);
        console.error(error);
      });
  };

  const handleCloseModal = () => {
    setViewModal(false);
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
          onClick={checkoutOrder}
        >
          Оформить заказ
        </Button>
      </div>

      {viewModal && !hasErrorsWithFetching && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
