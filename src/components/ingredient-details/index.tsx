import { useLocation, useParams } from "react-router-dom";

import { NUTRITIONS } from "consts";

import styles from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { ingredientsSelector } from "store/ingredients/selectors";
import { useEffect } from "react";
import { selectIngredient } from "store/ingredients/slice";

const IngredientDetails = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const state = location.state;

  const { ingredients, selectedIngredient } = useSelector(ingredientsSelector);

  const { id } = useParams();

  useEffect(() => {
    if (!selectedIngredient && ingredients.length) {
      const foundIngredient = ingredients.find(({ _id }) => id === _id);

      if (foundIngredient) {
        dispatch(selectIngredient(foundIngredient));
      }
    }
  }, [dispatch, id, ingredients, selectedIngredient]);

  return (
    <>
      {!state && (
        <div className={`${styles.title} text text_type_main-large mt-25`}>
          Детали ингредиента
        </div>
      )}
      <div className={styles.modalWrapper}>
        <img
          className={styles.modalImage}
          src={selectedIngredient?.image_large}
          alt="modalImage"
        />

        <p className={`${styles.modalText} text text_type_main-medium`}>
          {selectedIngredient?.name}
        </p>
      </div>

      <div className={styles.nutritionBlock}>
        {NUTRITIONS.map(({ description, name }) => {
          return (
            <div className={styles.nutritionItem} key={name}>
              <p className="text text_type_main-default">{description}</p>
              <p className="text text_type_digits-default pt-2 ">
                {selectedIngredient &&
                  selectedIngredient[
                    name as "proteins" | "fat" | "carbohydrates" | "calories"
                  ]}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default IngredientDetails;
