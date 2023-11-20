import { NavLink } from "react-router-dom";

import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { profileSelector } from "store/profile/selectors";
import { useAppSelector } from "hooks/useAppSelector";

import styles from "./style.module.scss";
const AppHeader = () => {
  const { authorizated } = useAppSelector(profileSelector);

  return (
    <header className={styles.header}>
      <nav className={styles.navItem}>
        <NavLink to="/">
          <BurgerIcon type="primary" />
          <span
            className={`${styles.headerItemText} ${styles.active} text text_type_main-default mr-10 ml-2`}
          >
            Конструктор
          </span>
        </NavLink>

        <NavLink to="/">
          <ListIcon type="secondary" />
          <span
            className={`${styles.headerItemText} text text_type_main-default ml-2 text_color_inactive`}
          >
            Лента заказов
          </span>
        </NavLink>
      </nav>

      <NavLink to="/" className={styles.headerLogo}>
        <Logo />
      </NavLink>

      <NavLink
        to={{
          pathname: authorizated ? "/profile" : "/login",
        }}
        state={{ from: "/profile" }}
        className={styles.navItem}
      >
        <ProfileIcon type="secondary" />
        <span
          className={`${styles.headerItemText} text text_type_main-default ml-2 text_color_inactive`}
        >
          Личный кабинет
        </span>
      </NavLink>
    </header>
  );
};

export default AppHeader;
