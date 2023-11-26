import { useMemo } from "react";
import { NavLink } from "react-router-dom";

import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { logoutUser } from "store/profile/asyncThunks";

import { useAppDispatch } from "hooks/useAppDispatch";

import { useForm } from "hooks/useForm";

import styles from "./style.module.scss";

const Profile = () => {
  const dispatch = useAppDispatch();

  const { formData, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const logoutUserHandler = async () => await dispatch(logoutUser());

  const hasEmptyField = useMemo(() => {
    return !formData.name || !formData.email || !formData.password;
  }, [formData]);

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
    </div>
  );
};

export default Profile;
