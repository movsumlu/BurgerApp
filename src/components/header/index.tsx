import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./style.module.scss";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav>
        <a href="#" className={styles.navItem}>
          <BurgerIcon type="primary" />
          <span
            className={`${styles.headerItemText} text text_type_main-default mr-10 ml-2`}
          >
            Конструктор
          </span>
        </a>

        <a href="#" className={styles.navItem}>
          <ListIcon type="secondary" />
          <span
            className={`${styles.headerItemText} text text_type_main-default ml-2 text_color_inactive`}
          >
            Лента заказов
          </span>
        </a>
      </nav>

      <nav>
        <Logo />
      </nav>

      <nav>
        <a href="#" className={styles.navItem}>
          <ProfileIcon type="secondary" />
          <span
            className={`${styles.headerItemText} text text_type_main-default ml-2 text_color_inactive`}
          >
            Личный кабинет
          </span>
        </a>
      </nav>
    </header>
  );
};

export default AppHeader;
