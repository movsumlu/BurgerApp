import {
  DragIcon,
  CurrencyIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { orderList } from "../../utils/order-list";

import styles from "./style.module.scss";

const BurgerConstructor = () => {
  return (
    <div className={styles.burgerConstructorContainer}>
      {orderList.map(
        ({ id, isLocked, type, name, price, image_mobile }: any) => {
          return (
            <div key={id} className={styles.ingredientItem}>
              {!isLocked ? (
                <DragIcon type={"primary"} />
              ) : (
                <div className={"pl-6"} />
              )}

              <ConstructorElement
                isLocked={isLocked}
                text={name}
                type={type}
                price={price}
                thumbnail={image_mobile}
              />
            </div>
          );
        }
      )}

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
