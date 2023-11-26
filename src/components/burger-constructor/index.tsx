import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";

import { v4 as uuid } from "uuid";

import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerConstructorItem from "components/burger-constructor-item";
import OrderDetails from "components/order-details";
import Modal from "components/modal";

import { orderSelector } from "store/order/selectors";
import { profileSelector } from "store/profile/selectors";

import { IBurgerIngredientsItem } from "types/interfaces";

import {
  addBuns,
  addIngredient,
  deleteIngredient,
  clearOrder,
  displayOrderModal,
  hideOrderModal,
} from "store/order/slice";

import { useAppSelector } from "hooks/useAppSelector";

import { checkoutOrder } from "store/order/asyncThunks";
import { useAppDispatch } from "hooks/useAppDispatch";

import styles from "./style.module.scss";

const BurgerConstructor = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { authorizated } = useAppSelector(profileSelector);

  const { buns, ingredients, order, showOrderModal } =
    useAppSelector(orderSelector);

  const [{ isDrag }, drop] = useDrop({
    accept: "ingredient",
    drop(ingredient: IBurgerIngredientsItem[]) {
      const updatedIngredient = { ...ingredient[0], uuid: uuid() };

      ingredient[0].type === "bun"
        ? dispatch(addBuns(updatedIngredient))
        : dispatch(addIngredient(updatedIngredient));
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

  const hasBunsIngredients = useMemo(() => {
    return (buns && !!ingredients.length) || (!buns && !ingredients.length);
  }, [buns, ingredients]);

  const IDOfIngredients = useMemo(
    () => buns && ingredients.length && ingredients.map(({ _id }) => _id),
    [buns, ingredients]
  );

  const checkoutOrderHandler = async () => {
    if (authorizated && IDOfIngredients) {
      await dispatch(checkoutOrder(IDOfIngredients));
      dispatch(clearOrder());
      dispatch(displayOrderModal());
    } else {
      navigate("/login", { state: { from: "/" }, replace: true });
    }
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
                  text={buns.name + " (верх)"}
                  price={buns.price}
                  thumbnail={buns.image}
                />
              </div>
            )}

            {!!ingredients.length && (
              <div className={styles.ingredientsWrapper}>
                {ingredients.map(
                  (ingredient: IBurgerIngredientsItem, index) => {
                    return (
                      <BurgerConstructorItem
                        key={ingredient.uuid}
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
                  text={buns.name + " (низ)"}
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
            disabled={!hasBunsIngredients}
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
