import PropTypes from "prop-types";

import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./style.module.scss";

interface IBurgerConstructorItemProps {
  isLocked: boolean;
  type?: "bottom" | "top";
  text: string;
  price: number;
  thumbnail: string;
}

const BurgerConstructorItem = (props: IBurgerConstructorItemProps) => {
  const { isLocked, text, type, price, thumbnail } = props;

  return (
    <div className={styles.ingredientItem}>
      {!isLocked ? <DragIcon type={"primary"} /> : <div className={"pl-6"} />}

      <ConstructorElement
        isLocked={isLocked}
        text={text}
        type={type}
        price={price}
        thumbnail={thumbnail}
      />
    </div>
  );
};

BurgerConstructorItem.propTypes = {
  isLocked: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["bottom", "top"]),
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default BurgerConstructorItem;
