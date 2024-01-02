import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";

import { ingredientsSelector } from "store/ingredients/selectors";

import { onSelectOrder } from "store/orders/slice";
import { displayModal } from "store/order/slice";

import { IBurgerIngredientsItem, IOrder } from "types/interfaces";

import { formatDate, getStatus } from "utils/helper";

import styles from "./style.module.scss";

export const FeedItem = ({
  order,
  showStatus,
}: {
  order: IOrder;
  showStatus: boolean;
}) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const [orderIngredients, setOrderIngredients] = useState<
    IBurgerIngredientsItem[]
  >([]);

  const [price, setPrice] = useState(0);

  const { name, number, createdAt, status } = order;

  const { ingredients } = useAppSelector(ingredientsSelector);

  useEffect(() => {
    let totalPrice = 0;
    let targetIngredients: IBurgerIngredientsItem[] = [];

    order.ingredients.forEach((orderIngredient) => {
      let targetIngredient = ingredients.find(
        (ingredient) => orderIngredient === ingredient._id
      );

      if (targetIngredient) {
        targetIngredients.push(targetIngredient);

        if (targetIngredient.type === "bun") {
          totalPrice += 2 * targetIngredient.price;
        } else {
          totalPrice += targetIngredient.price;
        }
      }
    });

    setOrderIngredients(targetIngredients);
    setPrice(totalPrice);
  }, [order.ingredients, ingredients]);

  const displayFeedModalHandler = () => {
    dispatch(
      onSelectOrder({
        ...order,
        ingredients: orderIngredients,
        totalPrice: price,
      })
    );

    navigate(
      location.pathname === "/feed"
        ? `/feed/${number}`
        : `/profile/orders/${number}`,
      {
        state: { background: location },
      }
    );

    dispatch(displayModal("hideModal"));
  };

  return (
    <div onClick={displayFeedModalHandler}>
      <section className={styles.order}>
        <div className={styles.feedHeader}>
          <p className="text text_type_digits-default">#{number}</p>
          <p className="text text_type_main-default text_color_inactive">
            {formatDate(createdAt)}
          </p>
        </div>

        <p className={styles.name + " text text_type_main-medium pt-6"}>
          {name}
        </p>

        <p>
          {showStatus && (
            <span
              className="text text_type_main-default"
              style={{ color: status === "done" ? "#00CCCC" : "#FFFFFF" }}
            >
              {getStatus(status)}
            </span>
          )}
        </p>

        <div className={styles.feedFooter}>
          <div className={styles.images}>
            {orderIngredients.map((ingredient, index) => (
              <div
                key={index}
                className={styles.imageWrapper}
                style={{ left: -index * 15, zIndex: 100 - index }}
              >
                <img
                  className={styles.image}
                  src={ingredient.image_mobile}
                  alt={`ingredient_image of ${ingredient.image_mobile}`}
                />
              </div>
            ))}
          </div>

          <div className={styles.coast}>
            <span className="text text_type_digits-default pr-2">{price}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </section>
    </div>
  );
};
