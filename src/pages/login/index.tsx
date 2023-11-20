import { SyntheticEvent, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { LOGIN_URL, checkResponse } from "services/API";

import { setCookie } from "services/cookie";
import { setUser } from "store/profile/slice";

import { useForm } from "hooks/useForm";
import { useOnEnter } from "hooks/useOnEnter";

import styles from "./style.module.scss";

const Login = () => {
  const dispatch = useDispatch();

  const { formData, handleChange } = useForm({
    email: "",
    password: "",
  });

  const hasEmptyField = useMemo(() => {
    return !formData.email || !formData.password;
  }, [formData]);

  const loginUser = useCallback(
    async (event: SyntheticEvent | KeyboardEvent) => {
      event.preventDefault();

      try {
        const response = await fetch(`${LOGIN_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const loginUserResponse = await checkResponse(response);

        const { success, user, accessToken, refreshToken } = loginUserResponse;

        if (success) {
          dispatch(
            setUser({
              name: user.name,
              email: user.email,
            })
          );

          setCookie("token", accessToken.split("Bearer ")[1]);
          localStorage.setItem("refreshToken", refreshToken);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [formData, dispatch]
  );

  useOnEnter(loginUser, hasEmptyField);

  return (
    <div className={styles.loginBlock}>
      <form className={styles.loginForm} onSubmit={loginUser}>
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
