import BurgerConstructor from "../burger-constructor";
import BurgerIngredients from "../burger-ingredients";

import { IBurgerIngredientsItem } from "../../types/interfaces";

import styles from "./style.module.scss";

const Main = (props: { ingredients: IBurgerIngredientsItem[] }) => {
  const { ingredients } = props;

  return (
    <main className={styles.main}>
      <section className={styles.mainItem}>
        <BurgerIngredients ingredients={ingredients} />
      </section>

      <section className={`${styles.mainItem} ml-10`}>
        <BurgerConstructor ingredients={ingredients} />
      </section>
    </main>
  );
};

export default Main;
