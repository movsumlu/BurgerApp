import { SyntheticEvent, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { AppDispatch } from "store";

import { registerUser } from "store/profile/asyncThunks";

import { useForm } from "hooks/useForm";
import { useOnEnter } from "hooks/useOnEnter";

import styles from "./style.module.scss";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { formData, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const hasEmptyField = useMemo(() => {
    return !formData.name || !formData.email || !formData.password;
  }, [formData]);

  const registerUserHandler = useCallback(
    async (event: SyntheticEvent | KeyboardEvent) => {
      event.preventDefault();
      await dispatch(registerUser(formData));
    },
    [formData, dispatch]
  );

  useOnEnter(registerUserHandler, hasEmptyField);

  return (
    <>
      <form className={styles.registerForm} onSubmit={registerUserHandler}>
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
