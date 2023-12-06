import { SyntheticEvent, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  FORGOT_PASSWORD_URL,
  checkOkResponse,
  checkSuccessResponse,
} from "services/API";

import { useKeyDown } from "hooks/useKeyDown";
import { useForm } from "hooks/useForm";

import styles from "./style.module.scss";

export const ForgotPassword = () => {
  const { formData, handleChange } = useForm({
    email: "",
  });

  const navigate = useNavigate();

  const hasEmptyField = useMemo(() => !formData.email, [formData]);

  const resetPassword = useCallback(
    (event: SyntheticEvent | KeyboardEvent) => {
      event.preventDefault();

      return fetch(`${FORGOT_PASSWORD_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      })
        .then(checkOkResponse)
        .then(checkSuccessResponse)
        .then(() => {
          localStorage.setItem("resetPasswordStepPassed", "true");
          navigate("/reset-password", { replace: true });
        });
    },

    [formData, navigate]
  );

  useKeyDown(resetPassword, "Enter", hasEmptyField);

  return (
    <div className={styles.forgotPasswordBlock}>
      <form className={styles.forgotPasswordForm} onSubmit={resetPassword}>
        <h3 className="text text_type_main-medium">Восстановление пароля</h3>
        <Input
          name={"email"}
          value={formData.email}
          type={"email"}
          placeholder={"E-mail"}
          onChange={handleChange}
        />

        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={hasEmptyField}
        >
          Восстановить
        </Button>
      </form>

      <div className={styles.forgotPasswordFooter}>
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
