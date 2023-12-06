import { useCallback, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { useAppDispatch } from "hooks/useAppDispatch";

import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { replaceIngredients } from "store/order/slice";

import { IBurgerIngredientsItem } from "types/interfaces";

import styles from "./style.module.scss";

interface IBurgerConstructorItemProps {
  item: IBurgerIngredientsItem;
  isLocked: boolean;
  index: number;
  deleteIngredient: () => void;
}

export const BurgerConstructorItem = (props: IBurgerConstructorItemProps) => {
  const { index, item, isLocked, deleteIngredient } = props;

  const dispatch = useAppDispatch();

  const ref = useRef<HTMLElement | null>(null);

  const [, drop] = useDrop({
    accept: "item",

    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(ingredient: any, monitor) {
      const dragIndex = ingredient.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      if (!hoverBoundingRect) return;

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) return;

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      dispatch(replaceIngredients({ dragIndex, hoverIndex }));

      ingredient.index = hoverIndex;
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
      <DragIcon type={"primary"} />

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
