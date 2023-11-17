import { useState } from "react";
import { NavLink } from "react-router-dom";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { deleteAllCookies } from "services/cookie";
import { useDispatch } from "react-redux";
import { clearUser } from "store/profile/slice";

import styles from "./style.module.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const logoutUser = () => {
    deleteAllCookies();
    dispatch(clearUser());
    localStorage.removeItem("resetPasswordStepPassed");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={styles.profileBlock}>
      <nav className={styles.navBlock}>
        <NavLink
          to="/profile"
          className={`${styles.link} ${styles.link__active} text text_type_main-medium`}
        >
          <span className="ml-2 pb-5">Профиль</span>
        </NavLink>

        <NavLink
          to="/profile/orders"
          className={`${styles.link} text text_type_main-medium text_color_inactive`}
        >
          <span className="ml-2 pb-5">История заказов</span>
        </NavLink>

        <NavLink
          to="/login"
          className={`${styles.link} text text_type_main-medium text_color_inactive`}
          onClick={logoutUser}
        >
          <span className="ml-2 pb-5">Выход</span>
        </NavLink>

        <div className="pt-20">
          <span className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </span>
        </div>
      </nav>

      <div>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleInputChange}
          icon={"EditIcon"}
          value={state.name}
          name={"name"}
          size={"default"}
          extraClass="mb-5"
        />

        <Input
          type={"text"}
          placeholder={"Email"}
          onChange={handleInputChange}
          icon={"EditIcon"}
          name={"email"}
          value={state.email}
          extraClass="mb-5"
        />

        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={handleInputChange}
          icon={"EditIcon"}
          name={"password"}
          value={state.password ?? ""}
          size={"default"}
          extraClass="mb-5"
        />
      </div>
    </div>
  );
};

export default Profile;
