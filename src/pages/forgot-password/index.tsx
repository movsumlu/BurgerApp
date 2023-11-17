import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./style.module.scss";
import { FORGOT_PASSWORD_URL, checkResponse } from "services/API";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const resetPassword = async () => {
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
  };

  return (
    <div className={styles.forgotPasswordBlock}>
      <div className={styles.forgotPasswordForm}>
        <h3 className="text text_type_main-medium">Восстановление пароля</h3>
        <Input
          type={"email"}
          placeholder={"Укажите e-mail"}
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="text_type_main-default"
          onClick={resetPassword}
        >
          Восстановить
        </Button>
      </div>

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
