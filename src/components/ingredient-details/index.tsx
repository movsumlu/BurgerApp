import { nutritions } from "../../consts";

import styles from "./style.module.scss";

const IngredientDetails = (props: { selectedIngredient: any }) => {
  const { selectedIngredient } = props;

  return (
    <>
      <div className={styles.modalWrapper}>
        <img
          className={styles.modalImage}
          src={selectedIngredient.image_large}
          alt="modalImage"
        />

        <div className={`${styles.modalText} text text_type_main-medium`}>
          {selectedIngredient.name}
        </div>
      </div>
      <div className={styles.nutritionBlock}>
        {nutritions.map(({ description, name }) => {
          return (
            <div className={styles.nutritionItem} key={name}>
              <div>{description}</div>
              <div className="text text_type_digits-default pt-2">
                {selectedIngredient[name]}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default IngredientDetails;
