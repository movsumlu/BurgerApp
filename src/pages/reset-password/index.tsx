import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { RESET_PASSWORD_URL, checkResponse } from "services/API";

import styles from "./style.module.scss";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    code: "",
  });

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const savePassword = async () => {
    try {
      const response = await fetch(`${RESET_PASSWORD_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: formData.password,
          token: formData.code,
        }),
      });

      const { success } = await checkResponse(response);

      if (success) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.resetPasswordBlock}>
      <div className={styles.resetPasswordForm}>
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
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="text_type_main-default mt-5"
          onClick={savePassword}
        >
          Сохранить
        </Button>
      </div>

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

export default ResetPassword;
