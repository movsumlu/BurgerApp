import { SyntheticEvent, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { REGISTER_URL, checkResponse } from "services/API";
import { setCookie } from "services/cookie";
import { setUser } from "store/profile/slice";

import { useForm } from "hooks/useForm";
import { useOnEnter } from "hooks/useOnEnter";

import styles from "./style.module.scss";

const Register = () => {
  const dispatch = useDispatch();

  const { formData, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const hasEmptyField = useMemo(() => {
    return !formData.name || !formData.email || !formData.password;
  }, [formData]);

  const registerUser = useCallback(
    async (event: SyntheticEvent | KeyboardEvent) => {
      event.preventDefault();

      try {
        const response = await fetch(`${REGISTER_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const registerUserResponse = await checkResponse(response);

        const { success, user, accessToken, refreshToken } =
          registerUserResponse;

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

  useOnEnter(registerUser, hasEmptyField);

  return (
    <>
      <form className={styles.registerForm} onSubmit={registerUser}>
        <h3 className="text text_type_main-medium">Регистрация</h3>
        <Input
          name={"name"}
          value={formData.name}
          onChange={handleChange}
          type={"text"}
          placeholder={"Имя"}
        />
        <Input
          name={"email"}
          value={formData.email}
          onChange={handleChange}
          type={"email"}
          placeholder={"E-mail"}
        />
        <PasswordInput
          onChange={handleChange}
          value={formData.password}
          name={"password"}
        />

        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={hasEmptyField}
        >
          <p className="text text_type_main-default">Зарегистрироваться</p>
        </Button>
      </form>

      <div className={styles.registerFooter}>
        <span className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
          <Link to="/login" className="text text_type_main-default pl-2">
            Войти
          </Link>
        </span>
      </div>
    </>
  );
};

export default Register;
