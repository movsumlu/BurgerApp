import { SyntheticEvent, useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { FORGOT_PASSWORD_URL, checkResponse } from "services/API";
import { useOnEnter } from "hooks/useOnEnter";

import styles from "./style.module.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const hasEmptyField = useMemo(() => {
    return !email;
  }, [email]);

  const resetPassword = useCallback(
    async (event: SyntheticEvent | KeyboardEvent) => {
      event.preventDefault();

      try {
        const response = await fetch(`${FORGOT_PASSWORD_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        });

        const { success } = await checkResponse(response);

        if (success) {
          localStorage.setItem("resetPasswordStepPassed", "true");
          navigate("/reset-password", { replace: true });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [email, navigate]
  );

  useOnEnter(resetPassword, hasEmptyField);

  return (
    <div className={styles.forgotPasswordBlock}>
      <form className={styles.forgotPasswordForm} onSubmit={resetPassword}>
        <h3 className="text text_type_main-medium">Восстановление пароля</h3>
        <Input
          type={"email"}
          placeholder={"Укажите e-mail"}
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />

        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={hasEmptyField}
        >
          <p className="text text_type_main-default">Восстановить</p>
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

export default ForgotPassword;
