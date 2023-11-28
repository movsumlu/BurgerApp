import { SyntheticEvent, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppDispatch } from "hooks/useAppDispatch";

import { loginUser } from "store/profile/asyncThunks";

import { useForm } from "hooks/useForm";
import { useKeyDown } from "hooks/useKeyDown";

import styles from "./style.module.scss";

const Login = () => {
  const dispatch = useAppDispatch();

  const { formData, handleChange } = useForm({
    email: "",
    password: "",
  });

  const hasEmptyField = useMemo(
    () => !formData.email || !formData.password,
    [formData]
  );

  const loginUserHandler = useCallback(
    async (event: SyntheticEvent | KeyboardEvent) => {
      event.preventDefault();
      await dispatch(loginUser(formData));
    },
    [formData, dispatch]
  );

  useKeyDown(loginUserHandler, "Enter", hasEmptyField);

  return (
    <div className={styles.loginBlock}>
      <form className={styles.loginForm} onSubmit={loginUserHandler}>
        <h3 className="text text_type_main-medium">Вход</h3>
        <Input
          name={"email"}
          value={formData.email}
          type={"email"}
          placeholder={"E-mail"}
          onChange={handleChange}
        />

        <PasswordInput
          name={"password"}
          value={formData.password}
          placeholder={"Пароль"}
          onChange={handleChange}
        />

        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={hasEmptyField}
        >
          Войти
        </Button>
      </form>

      <div className={styles.loginFooter}>
        <span className="text text_type_main-default text_color_inactive">
          Вы - новый пользователь?
          <Link to="/register" className="text text_type_main-default pl-2">
            Зарегистрироваться
          </Link>
        </span>

        <br />

        <span className="text text_type_main-default text_color_inactive">
          Забыли пароль?
          <Link
            to="/forgot-password"
            className="text text_type_main-default pl-2"
          >
            Восстановить пароль
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
