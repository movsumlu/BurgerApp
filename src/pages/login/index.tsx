import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./style.module.scss";
import { LOGIN_URL, checkResponse } from "services/API";
import { setCookie } from "services/cookie";
import { setUser } from "store/profile/slice";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${LOGIN_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const loginUserResponse = await checkResponse(response);

      if (loginUserResponse.success) {
        dispatch(
          setUser({
            name: loginUserResponse.user.name,
            email: loginUserResponse.user.email,
          })
        );

        const accessToken = loginUserResponse.accessToken.split("Bearer ")[1];
        const refreshToken = loginUserResponse.refreshToken;

        setCookie("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.loginBlock}>
      <div className={styles.loginForm}>
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
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="text_type_main-default"
          onClick={handleSubmit}
        >
          Войти
        </Button>
      </div>

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
