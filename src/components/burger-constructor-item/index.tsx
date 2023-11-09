import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useDrag, useDrop } from "react-dnd";

import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { orderListSelector } from "store/orderList/selectors";
import { replaceIngredient } from "store/orderList/slice";

import { IBurgerIngredientsItem } from "types/interfaces";

import styles from "./style.module.scss";

interface IBurgerConstructorItemProps {
  item: IBurgerIngredientsItem;
  isLocked: boolean;
  index: number;
  deleteIngredient: () => void;
}

const BurgerConstructorItem = (props: IBurgerConstructorItemProps) => {
  const { index, item, isLocked, deleteIngredient } = props;

  const dispatch = useDispatch();

  const { orderList } = useSelector(orderListSelector);

  const ref = useRef<HTMLElement | null>(null);

  const [, drop] = useDrop({
    accept: "item",

    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(ingredient: any) {
      if (!ref.current) return;

      const dragIndex = ingredient.index;
      const hoverIndex = index;

      if (
        ingredient.item.type !== "bun" &&
        orderList[hoverIndex].type !== "bun"
      ) {
        dispatch(replaceIngredient({ dragIndex, hoverIndex }));
      }
    },
  });

  const [{ isDrag }, drag] = useDrag({
    type: "item",
    item: () => {
      return { item, index };
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      ref.current = node;
      drag(drop(ref));
    },
    [drag, drop]
  );

  const draggingOpacity = isDrag && styles.draggingOpacity;

  return (
    <div
      ref={setRef}
      className={`${styles.burgerConstructorItem} ${draggingOpacity}`}
    >
      {!isLocked ? <DragIcon type={"primary"} /> : <div className={"pl-6"} />}

      <ConstructorElement
        isLocked={isLocked}
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        handleClose={deleteIngredient}
        extraClass={styles.burgerConstructorElement}
      />
    </div>
  );
};

export default BurgerConstructorItem;
