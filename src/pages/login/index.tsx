import { SyntheticEvent, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { loginUser } from "store/profile/asyncThunks";
import { AppDispatch } from "store";

import { useForm } from "hooks/useForm";
import { useOnEnter } from "hooks/useOnEnter";

import styles from "./style.module.scss";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { formData, handleChange } = useForm({
    email: "",
    password: "",
  });

  const hasEmptyField = useMemo(() => {
    return !formData.email || !formData.password;
  }, [formData]);

  const loginUserHandler = useCallback(
    async (event: SyntheticEvent | KeyboardEvent) => {
      event.preventDefault();
      await dispatch(loginUser(formData));
    },
    [formData, dispatch]
  );

  useOnEnter(loginUserHandler, hasEmptyField);

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
          <p className="text text_type_main-default">Войти</p>
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
