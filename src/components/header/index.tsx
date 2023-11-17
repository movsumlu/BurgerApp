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
      <nav className={styles.navItem}>
        <a href="/">
          <BurgerIcon type="primary" />
          <span
            className={`${styles.headerItemText} ${styles.active} text text_type_main-default mr-10 ml-2`}
          >
            Конструктор
          </span>
        </a>

        <a href="/">
          <ListIcon type="secondary" />
          <span
            className={`${styles.headerItemText} text text_type_main-default ml-2 text_color_inactive`}
          >
            Лента заказов
          </span>
        </a>
      </nav>

      <a href="/" className={styles.headerLogo}>
        <Logo />
      </a>

      <a href="/profile" className={styles.navItem}>
        <ProfileIcon type="secondary" />
        <span
          className={`${styles.headerItemText} text text_type_main-default ml-2 text_color_inactive`}
        >
          Личный кабинет
        </span>
      </a>
    </header>
  );
};

export default AppHeader;
