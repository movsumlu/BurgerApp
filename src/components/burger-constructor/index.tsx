import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";

import {
  CurrencyIcon,
  Button,
  ConstructorElement,
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
  deleteIngredient,
  clearOrder,
  displayOrderModal,
  hideOrderModal,
} from "store/order/slice";

import styles from "./style.module.scss";

const BurgerConstructor = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { buns, ingredients, order, showOrderModal } =
    useSelector(orderSelector);

  const [{ isDrag }, drop] = useDrop({
    accept: "ingredient",
    drop(ingredient: IBurgerIngredientsItem[]) {
      ingredient[0].type === "bun"
        ? dispatch(addBuns(ingredient))
        : dispatch(addIngredient(ingredient));
    },
    collect: (monitor) => ({
      isDrag: monitor.canDrop(),
    }),
  });

  const totalPrice = useMemo(() => {
    return [buns, ...ingredients, buns].reduce((acc, item) => {
      return item !== null ? acc + item.price : acc;
    }, 0);
  }, [buns, ingredients]);

  const IDOfIngredients = useMemo(
    () => ingredients.map(({ _id }) => _id),
    [ingredients]
  );

  const checkoutOrderHandler = async () => {
    await dispatch(checkoutOrder(IDOfIngredients));
    dispatch(clearOrder());
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
        {buns || ingredients.length ? (
          <>
            {buns && (
              <div className={`${styles.element} mb-4 pl-10 pr-8`}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={buns.name}
                  price={buns.price}
                  thumbnail={buns.image}
                />
              </div>
            )}

            {!!ingredients.length && (
              <div className={styles.ingredientsWrapper}>
                {ingredients.map(
                  (ingredient: IBurgerIngredientsItem, index: number) => {
                    return (
                      <BurgerConstructorItem
                        key={index}
                        index={index}
                        item={ingredient}
                        isLocked={false}
                        deleteIngredient={() =>
                          dispatch(deleteIngredient(index))
                        }
                      />
                    );
                  }
                )}
              </div>
            )}

            {buns && (
              <div className={`${styles.element} pl-10 pr-6`}>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={buns.name}
                  price={buns.price}
                  thumbnail={buns.image}
                />
              </div>
            )}
          </>
        ) : (
          <p className={styles.helpText}>
            Переместите сюда ингредиент для добавления в заказ
          </p>
        )}
      </div>

      {(buns || !!ingredients.length) && (
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
            disabled={buns ? false : true}
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
