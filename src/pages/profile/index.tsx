import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { FeedItem } from "components/feed-item";

import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";

import { logoutUser } from "store/profile/asyncThunks";

import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "store/orders/actions";

import { ordersSelector } from "store/orders/selectors";

import { useForm } from "hooks/useForm";

import { WS_ORDERS_BASE_URL } from "services/API";
import { getCookie } from "services/cookie";

import { IOrder } from "types/interfaces";

import styles from "./style.module.scss";

export const Profile = () => {
  const dispatch = useAppDispatch();

  const { messages } = useAppSelector(ordersSelector);

  const [activeNav, setActiveNav] = useState("profile");
  const [orders, setOrders] = useState<IOrder[]>([]);

  const { formData, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  type TNavItem = "profile" | "orders";

  useEffect(() => {
    const navItemFromLS = localStorage.getItem("navItem");

    if (navItemFromLS) {
      setActiveNav(navItemFromLS);
    }

    const token = getCookie("token");

    dispatch({
      type: WS_CONNECTION_START,
      payload: `${WS_ORDERS_BASE_URL}?token=${token}`,
    });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
      localStorage.removeItem("navItem");
    };
  }, [dispatch]);

  useEffect(() => {
    if (messages?.orders) {
      setOrders(messages.orders as IOrder[]);
    }
  }, [messages]);

  const logoutUserHandler = async () => await dispatch(logoutUser());

  const hasEmptyField = useMemo(
    () => !formData.name || !formData.email || !formData.password,
    [formData]
  );

  const handleNavChange = (navItem: TNavItem) => {
    setActiveNav(navItem);
    localStorage.setItem("navItem", navItem);
  };

  return (
    <div className={styles.profileBlock}>
      <nav className={styles.navBlock}>
        <NavLink
          to="/profile"
          className={`${styles.link} ${
            activeNav === "profile"
              ? styles.link__active
              : "text_color_inactive"
          } text text_type_main-medium`}
          onClick={() => handleNavChange("profile")}
        >
          <span className="ml-2 pb-5">Профиль</span>
        </NavLink>

        <NavLink
          to="/profile/orders"
          className={`${styles.link} ${
            activeNav === "orders" ? styles.link__active : "text_color_inactive"
          } text text_type_main-medium`}
          onClick={() => handleNavChange("orders")}
        >
          <span className="ml-2 pb-5">История заказов</span>
        </NavLink>

        <NavLink
          to="/login"
          className={`${styles.link} text text_type_main-medium text_color_inactive`}
          onClick={logoutUserHandler}
        >
          <span className="ml-2 pb-5">Выход</span>
        </NavLink>

        <div className="pt-20">
          <span className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете <br />
            изменить свои персональные данные
          </span>
        </div>
      </nav>

      {activeNav === "profile" && (
        <form>
          <Input
            name={"name"}
            value={formData.name}
            type={"text"}
            placeholder={"Имя"}
            icon={"EditIcon"}
            size={"default"}
            extraClass="mb-5"
            onChange={handleChange}
          />

          <Input
            name={"email"}
            value={formData.email}
            type={"text"}
            placeholder={"Email"}
            icon={"EditIcon"}
            extraClass="mb-5"
            onChange={handleChange}
          />

          <Input
            name={"password"}
            value={formData.password}
            type={"password"}
            placeholder={"Пароль"}
            icon={"EditIcon"}
            size={"default"}
            extraClass="mb-5"
            onChange={handleChange}
          />

          <div className={styles.profileFormFooter}>
            <Button htmlType="button" type="secondary" size="medium">
              Отмена
            </Button>

            <Button
              htmlType="button"
              type="primary"
              size="medium"
              disabled={hasEmptyField}
            >
              Сохранить
            </Button>
          </div>
        </form>
      )}

      {activeNav === "orders" && (
        <div className={styles.ordersSections}>
          {orders.length ? (
            orders.map((order, index) => (
              <FeedItem order={order} key={index} showStatus={true} />
            ))
          ) : (
            <p className="text text_type_main-default text_color_inactive pt-7">
              У Вас нет заказов
            </p>
          )}
        </div>
      )}
    </div>
  );
};
