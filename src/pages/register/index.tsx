import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { REGISTER_URL, checkResponse } from "services/API";
import { setCookie } from "services/cookie";
import { setUser } from "store/profile/slice";

import styles from "./style.module.scss";

const Register = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const fieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${REGISTER_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const registerUserResponse = await checkResponse(response);

      if (registerUserResponse.success) {
        dispatch(
          setUser({
            name: registerUserResponse.user.name,
            email: registerUserResponse.user.email,
          })
        );

        const accessToken =
          registerUserResponse.accessToken.split("Bearer ")[1];
        const refreshToken = registerUserResponse.refreshToken;

        setCookie("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.registerForm}>
        <h3 className="text text_type_main-medium">Регистрация</h3>
        <Input
          name={"name"}
          value={formData.name}
          onChange={fieldChange}
          type={"text"}
          placeholder={"Имя"}
        />
        <Input
          name={"email"}
          value={formData.email}
          onChange={fieldChange}
          type={"email"}
          placeholder={"E-mail"}
        />
        <PasswordInput
          onChange={fieldChange}
          value={formData.password}
          name={"password"}
        />

        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="text_type_main-default"
          onClick={handleSubmit}
        >
          Зарегистрироваться
        </Button>
      </div>

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
