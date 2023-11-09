import { useDrag, useDrop } from "react-dnd";

import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { IBurgerIngredientsItem } from "types/interfaces";

import styles from "./style.module.scss";

interface IBurgerConstructorItemProps {
  item: IBurgerIngredientsItem;
  isLocked: true | false;
  deleteIngredient: () => void;
}

const BurgerConstructorItem = (props: IBurgerConstructorItemProps) => {
  const { item, isLocked, deleteIngredient } = props;

  return (
    <div className={styles.burgerConstructorItem}>
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
