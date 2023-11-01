import BurgerConstructor from "../burger-constructor";
import BurgerIngredients from "../burger-ingredients";

import styles from "./style.module.scss";

const Main = () => {
  return (
    <main className={styles.main}>
      <section className={styles.mainItem}>
        <BurgerIngredients />
      </section>

      <section className={`${styles.mainItem} ml-10`}>
        <BurgerConstructor />
      </section>
    </main>
  );
};

export default Main;
