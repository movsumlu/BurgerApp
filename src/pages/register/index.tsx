import { SyntheticEvent, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { registerUser } from "store/profile/asyncThunks";

import { useAppDispatch } from "hooks/useAppDispatch";

import { useForm } from "hooks/useForm";
import { useKeyDown } from "hooks/useKeyDown";

import styles from "./style.module.scss";

export const Register = () => {
  const dispatch = useAppDispatch();

  const { formData, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const hasEmptyField = useMemo(
    () => !formData.name || !formData.email || !formData.password,
    [formData]
  );

  const registerUserHandler = useCallback(
    async (event: SyntheticEvent | KeyboardEvent) => {
      event.preventDefault();
      await dispatch(registerUser(formData));
    },
    [formData, dispatch]
  );

  useKeyDown(registerUserHandler, "Enter", hasEmptyField);

  return (
    <>
      <form className={styles.registerForm} onSubmit={registerUserHandler}>
        <h3 className="text text_type_main-medium">Регистрация</h3>
        <Input
          name={"name"}
          value={formData.name}
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChange}
        />
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
          onChange={handleChange}
        />

        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={hasEmptyField}
        >
          Зарегистрироваться
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
