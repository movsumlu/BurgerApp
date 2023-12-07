import { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { profileSelector } from "store/profile/selectors";
import { useAppSelector } from "hooks/useAppSelector";

import styles from "./style.module.scss";

export const Header = () => {
  const { authorizated, name } = useAppSelector(profileSelector);

  const location = useLocation();

  const isMainPage: boolean = useMemo(
    () => location.pathname === "/",
    [location]
  );

  const isFeedPage: boolean = useMemo(
    () => location.pathname === "/feed",
    [location]
  );

  const isProfilePage: boolean = useMemo(
    () => location.pathname === "/profile",
    [location]
  );

  return (
    <header className={styles.header}>
      <nav className={styles.navItem}>
        <NavLink to="/">
          <BurgerIcon type={isMainPage ? "primary" : "secondary"} />
          <span
            className={`${
              styles.headerItemText
            }  text text_type_main-default mr-10 ml-2 ${
              isMainPage ? styles.active : "text_color_inactive"
            }`}
          >
            Конструктор
          </span>
        </NavLink>

        <NavLink to="/feed">
          <ListIcon type={isFeedPage ? "primary" : "secondary"} />
          <span
            className={`${
              styles.headerItemText
            } text text_type_main-default ml-2 ${
              isFeedPage ? styles.active : "text_color_inactive"
            }`}
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
        <ProfileIcon type={isProfilePage ? "primary" : "secondary"} />
        <span
          className={`${
            styles.headerItemText
          } text text_type_main-default ml-2 ${
            isProfilePage ? styles.active : "text_color_inactive"
          }`}
        >
          {!!name ? name : "Личный кабинет"}
        </span>
      </NavLink>
    </header>
  );
};
