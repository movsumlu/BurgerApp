import { SyntheticEvent, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useForm } from "hooks/useForm";
import { useKeyDown } from "hooks/useKeyDown";

import {
  RESET_PASSWORD_URL,
  checkOkResponse,
  checkSuccessResponse,
} from "services/API";

import styles from "./style.module.scss";

export const ResetPassword = () => {
  const { formData, handleChange } = useForm({
    password: "",
    code: "",
  });

  const hasEmptyField = useMemo(
    () => !formData.password || !formData.code,
    [formData]
  );

  const navigate = useNavigate();

  const savePassword = useCallback(
    async (event: SyntheticEvent | KeyboardEvent) => {
      event.preventDefault();

      fetch(`${RESET_PASSWORD_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: formData.password,
          token: formData.code,
        }),
      })
        .then(checkOkResponse)
        .then(checkSuccessResponse)
        .then(() => navigate("/", { replace: true }));
    },
    [formData, navigate]
  );

  useKeyDown(savePassword, "Enter", hasEmptyField);

  return (
    <div className={styles.resetPasswordBlock}>
      <form className={styles.resetPasswordForm} onSubmit={savePassword}>
        <h3 className="text text_type_main-medium">Восстановление пароля</h3>

        <PasswordInput
          name={"password"}
          value={formData.password}
          placeholder={"Введите новый пароль"}
          extraClass="mt-5"
          onChange={handleChange}
        />

        <Input
          name={"code"}
          value={formData.code}
          type={"text"}
          placeholder={"Введите код из письма"}
          extraClass="mt-5"
          onChange={handleChange}
        />

        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mt-10"
          disabled={hasEmptyField}
        >
          Сохранить
        </Button>
      </form>

      <div className={styles.resetPasswordFooter}>
        <span className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
          <Link to="/login" className="text text_type_main-default pl-2">
            Войти
          </Link>
        </span>
      </div>
    </div>
  );
};
