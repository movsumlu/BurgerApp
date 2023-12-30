import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppSelector } from "hooks/useAppSelector";
import { ordersSelector } from "store/orders/selectors";

import { IBurgerIngredientsItem } from "types/interfaces";

import { formatDate, getStatus } from "utils/helper";

import styles from "./style.module.scss";

export const FeedDetails = () => {
  const { selectedOrder } = useAppSelector(ordersSelector);

  return (
    selectedOrder && (
      <div className={styles.feed}>
        <p className="text text_type_digits-default">#{selectedOrder.number}</p>
        <p className="text text_type_main-medium pt-10">{selectedOrder.name}</p>
        <p className="text text_type_main-default text_color_inactive pt-2">
          {getStatus(selectedOrder.status)}
        </p>

        <div>
          <p className="text text_type_main-medium pt-15 pb-4">Состав:</p>

          <>
            {selectedOrder.ingredients.map(
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
                      <span className="pr-2">{ingredient.price}</span>
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
    )
  );
};
