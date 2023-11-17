import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerConstructor from "components/burger-constructor";
import BurgerIngredients from "components/burger-ingredients";

import styles from "./style.module.scss";

const Main = () => {
  return (
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <section className={styles.mainItem}>
          <BurgerIngredients />
        </section>

        <section className={`${styles.mainItem} ml-10`}>
          <BurgerConstructor />
        </section>
      </DndProvider>
    </main>
  );
};

export default Main;
