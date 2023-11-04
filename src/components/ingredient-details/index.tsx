import { nutritions } from "consts";
import { IBurgerIngredientsItem } from "types/interfaces";

import styles from "./style.module.scss";

const IngredientDetails = (props: {
  selectedIngredient: IBurgerIngredientsItem;
}) => {
  const { selectedIngredient } = props;

  return (
    <>
      <div className={styles.modalWrapper}>
        <img
          className={styles.modalImage}
          src={selectedIngredient.image_large}
          alt="modalImage"
        />

        <p className={`${styles.modalText} text text_type_main-medium`}>
          {selectedIngredient.name}
        </p>
      </div>
      <div className={styles.nutritionBlock}>
        {nutritions.map(({ description, name }) => {
          return (
            <div className={styles.nutritionItem} key={name}>
              <p className="text text_type_main-default">{description}</p>
              <p className="text text_type_digits-default pt-2 ">
                {
                  selectedIngredient[
                    name as "proteins" | "fat" | "carbohydrates" | "calories"
                  ]
                }
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default IngredientDetails;
