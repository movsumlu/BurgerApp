import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { deleteAllCookies } from "services/cookie";
import { clearUser } from "store/profile/slice";

import { useForm } from "hooks/useForm";

import styles from "./style.module.scss";

const Profile = () => {
  const dispatch = useDispatch();

  const { formData, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const logoutUser = () => {
    deleteAllCookies();
    dispatch(clearUser());
    localStorage.removeItem("resetPasswordStepPassed");
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

      <form>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChange}
          icon={"EditIcon"}
          value={formData.name}
          name={"name"}
          size={"default"}
          extraClass="mb-5"
        />

        <Input
          type={"text"}
          placeholder={"Email"}
          onChange={handleChange}
          icon={"EditIcon"}
          name={"email"}
          value={formData.email}
          extraClass="mb-5"
        />

        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={handleChange}
          icon={"EditIcon"}
          name={"password"}
          value={formData.password}
          size={"default"}
          extraClass="mb-5"
        />
      </form>
    </div>
  );
};

export default Profile;
