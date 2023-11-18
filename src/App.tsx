import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Header from "components/header";
import IngredientDetails from "components/ingredient-details";
import ProtectedRouteElement from "components/protected-route-element";

import Main from "pages/main";
import Profile from "pages/profile";
import Login from "pages/login";
import Register from "pages/register";

import ForgotPassword from "pages/forgot-password";
import ResetPassword from "pages/reset-password";

import { ERROR_TEXT } from "consts";

import { AppDispatch } from "store";

import { ingredientsSelector } from "store/ingredients/selectors";
import { fetchIngredients } from "store/ingredients/asyncThunks";

import styles from "./style.module.scss";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { errors } = useSelector(ingredientsSelector);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      {!errors ? (
        <>
          <Header />

          <Routes>
            <Route path="" element={<Main />} />

            <Route
              path="login"
              element={<ProtectedRouteElement element={<Login />} />}
            />

            <Route
              path="register"
              element={<ProtectedRouteElement element={<Register />} />}
            />

            <Route
              path="forgot-password"
              element={<ProtectedRouteElement element={<ForgotPassword />} />}
            />

            <Route
              path="reset-password"
              element={<ProtectedRouteElement element={<ResetPassword />} />}
            />

            <Route
              path="profile"
              element={<ProtectedRouteElement element={<Profile />} />}
            />

            <Route path="/ingredients/:id" element={<IngredientDetails />} />
          </Routes>
        </>
      ) : (
        <p className={`${styles.errorText} text text_type_main-large`}>
          {ERROR_TEXT}
        </p>
      )}
    </div>
  );
};

export default App;
