import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";

import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerConstructorItem from "components/burger-constructor-item";
import OrderDetails from "components/order-details";
import Modal from "components/modal";

import { orderSelector } from "store/order/selectors";

import { IBurgerIngredientsItem } from "types/interfaces";

import { AppDispatch } from "store";

import {
  addBuns,
  addIngredient,
  checkoutOrder,
  clearOrderList,
  deleteIngredient,
  displayOrderModal,
  hideOrderModal,
} from "store/order/slice";

import styles from "./style.module.scss";

const BurgerConstructor = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { order, orderList, showOrderModal } = useSelector(orderSelector);

  const hasBun = useMemo(() => {
    return orderList.some((ingredient) => ingredient.type === "bun");
  }, [orderList]);

  const [{ isDrag }, drop] = useDrop({
    accept: "ingredient",
    drop(ingredient: IBurgerIngredientsItem[]) {
      if (ingredient[0].type === "bun") {
        dispatch(addBuns(ingredient));
      } else if (ingredient[0].type !== "bun") {
        dispatch(addIngredient(ingredient));
      }
    },
    collect: (monitor) => ({
      isDrag: monitor.canDrop(),
    }),
  });

  const totalPrice = useMemo(
    () => orderList.reduce((acc, { price }) => acc + price, 0),
    [orderList]
  );

  const IDOfIngredients = useMemo(
    () => orderList.map(({ _id }) => _id),
    [orderList]
  );

  const checkoutOrderHandler = async () => {
    await dispatch(checkoutOrder(IDOfIngredients));
    dispatch(clearOrderList());
    dispatch(displayOrderModal());
  };

  const closeOrderModalHandler = () => {
    dispatch(hideOrderModal());
  };

  const draggingOpacity = isDrag && styles.draggingOpacity;

  return (
    <div
      className={`${styles.burgerConstructorContainer} ${
        isDrag && styles.containerBorder
      }`}
      ref={drop}
    >
      <div
        className={`${styles.burgerConstructorItemWrapper} ${draggingOpacity}`}
      >
        {orderList.length ? (
          orderList.map((item, index) => {
            return (
              <BurgerConstructorItem
                key={index}
                index={index}
                item={item}
                isLocked={item.type === "bun"}
                deleteIngredient={() => dispatch(deleteIngredient(index))}
              />
            );
          })
        ) : (
          <p className={styles.helpText}>
            Переместите сюда ингредиент для добавления в заказ
          </p>
        )}
      </div>
      {!!orderList.length && (
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
            disabled={hasBun ? false : true}
          >
            Оформить заказ
          </Button>
        </div>
      )}
      {showOrderModal && (
        <Modal onClose={closeOrderModalHandler}>
          <OrderDetails orderNumber={order && order.number} />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
