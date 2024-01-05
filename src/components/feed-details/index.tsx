import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";

import { ingredientsSelector } from "store/ingredients/selectors";
import { ordersSelector } from "store/orders/selectors";
import { onSelectOrder } from "store/orders/slice";
import { TOrder } from "store/orders/actions";

import {
  FETCH_ORDER_URL,
  checkOkResponse,
  checkSuccessResponse,
} from "services/API";

import { IBurgerIngredientsItem } from "types/interfaces";

import { LOADING_TEXT } from "utils/consts";

import { formatDate, getOrderNumber, getStatus } from "utils/helper";

import styles from "./style.module.scss";

export const FeedDetails = () => {
  const dispatch = useAppDispatch();

  const { selectedOrder } = useAppSelector(ordersSelector);
  const { ingredients } = useAppSelector(ingredientsSelector);

  const location = useLocation();

  const [order, setOrder] = useState<TOrder | null>(null);

  const [uniqIngredients, setUniqIngredients] = useState<
    IBurgerIngredientsItem[]
  >([]);

  useEffect(() => {
    const tempArray: IBurgerIngredientsItem[] = [];

    if (!selectedOrder) {
      const locationPathname = location.pathname;

      if (
        locationPathname.includes("/profile/orders/") ||
        locationPathname.includes("feed/")
      ) {
        fetch(`${FETCH_ORDER_URL}/${getOrderNumber(locationPathname)}`)
          .then(checkOkResponse)
          .then(checkSuccessResponse)
          .then(({ orders }) => {
            if (orders.length) {
              setOrder(orders[0]);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }

      let totalPrice = 0;
      let targetIngredients: IBurgerIngredientsItem[] = [];

      order &&
        order.ingredients.forEach((orderIngredient: string) => {
          let targetIngredient = ingredients.find(
            (ingredient) => orderIngredient === ingredient._id
          );

          if (targetIngredient) {
            targetIngredients.push(targetIngredient);

            totalPrice +=
              (targetIngredient.type === "bun" ? 2 : 1) *
              targetIngredient.price;
          }
        });

      if (order && order.ingredients) {
        dispatch(
          onSelectOrder({
            ...order,
            ingredients: targetIngredients,
            totalPrice: totalPrice,
          })
        );
      }
    }

    selectedOrder &&
      new Set(
        selectedOrder.ingredients.map(
          (ingredient: IBurgerIngredientsItem) => ingredient._id
        )
      ).forEach((id) => {
        ingredients.forEach((ingredient) => {
          if (id === ingredient._id) {
            tempArray.push(ingredient);
          }
        });
      });

    setUniqIngredients(tempArray);
  }, [ingredients, selectedOrder, location.pathname, order, dispatch]);

  const quantityById = (ingredient: IBurgerIngredientsItem) =>
    selectedOrder &&
    selectedOrder.ingredients.filter(
      (item: IBurgerIngredientsItem) => item._id === ingredient._id
    ).length;

  return selectedOrder ? (
    <div className={styles.feed}>
      <p className="text text_type_digits-default">#{selectedOrder.number}</p>
      <p className="text text_type_main-medium pt-10">{selectedOrder.name}</p>
      <p className="text text_type_main-default text_color_inactive pt-2">
        {getStatus(selectedOrder.status)}
      </p>

      <div>
        <p className="text text_type_main-medium pt-15 pb-4">Состав:</p>

        <>
          {uniqIngredients.map(
            (ingredient: IBurgerIngredientsItem, index: number) => {
              return (
                <div className={styles.ingredientWrapper} key={index}>
                  <div className={styles.imagesWrapper}>
                    <img
                      className={styles.image}
                      src={ingredient.image_mobile}
                      alt="ingredient_image"
                    />
                  </div>

                  <p className="text text_type_main-default">
                    {ingredient.name}
                  </p>

                  <div
                    className={`text text_type_digits-default ${styles.feedModalPrice}`}
                  >
                    <span className="pr-2">
                      {quantityById(ingredient)} x {ingredient.price}
                    </span>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              );
            }
          )}
        </>
      </div>

      <div className={styles.feedСompound}>
        <p className="text text_type_main-default text_color_inactive">
          {formatDate(selectedOrder.createdAt)}
        </p>
        <div
          className={`text text_type_digits-default ${styles.feedCurrencyIcon}`}
        >
          <span className="pr-2">{selectedOrder.totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  ) : (
    <p>{LOADING_TEXT}</p>
  );
};
