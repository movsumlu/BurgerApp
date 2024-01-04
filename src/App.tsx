import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { Header } from "components/header";
import { IngredientDetails } from "components/ingredient-details";
import { ProtectedRouteElement } from "components/protected-route-element";
import { Modal } from "components/modal";
import { FeedDetails } from "components/feed-details";

import { Main } from "pages/main";
import { Login } from "pages/login";
import { Register } from "pages/register";
import { ForgotPassword } from "pages/forgot-password";
import { ResetPassword } from "pages/reset-password";
import { Profile } from "pages/profile";
import { Feed } from "pages/feed";

import { ERROR_TEXT } from "utils/consts";

import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";

import { hideIngredientModal } from "store/ingredients/slice";
import { ingredientsSelector } from "store/ingredients/selectors";
import { fetchIngredients } from "store/ingredients/asyncThunks";

import { hideModal } from "store/order/slice";

import styles from "./style.module.scss";

export const App = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const location = useLocation();
  const background = location.state?.background;

  const { errors } = useAppSelector(ingredientsSelector);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const onCloseModalHandler = (
    typeOfModal: "ingredientModal" | "feedModal"
  ) => {
    if (typeOfModal === "ingredientModal") {
      dispatch(hideIngredientModal());
    }

    if (typeOfModal === "feedModal") {
      dispatch(hideModal("showFeedModal"));
    }

    navigate(-1);
  };

  return (
    <div className={styles.app}>
      {!errors ? (
        <>
          <Header />

          <Routes location={background || location}>
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
              path="feed"
              element={<ProtectedRouteElement element={<Feed />} />}
            />

            <Route path="/feed/:id" element={<FeedDetails />} />

            <Route
              path="profile"
              element={<ProtectedRouteElement element={<Profile />} />}
            />

            <Route
              path="profile/orders"
              element={<ProtectedRouteElement element={<Profile />} />}
            />

            <Route path="/profile/orders/:number" element={<FeedDetails />} />

            <Route path="/ingredients/:id" element={<IngredientDetails />} />

            <Route
              path="*"
              element={
                <h1 className={styles.notFoundText}>Страница не найдена 🙄</h1>
              }
            />
          </Routes>

          {background && (
            <Routes>
              <Route
                path="/ingredients/:id"
                element={
                  <Modal
                    headerText="Детали ингредиента"
                    onClose={() => onCloseModalHandler("ingredientModal")}
                  >
                    <IngredientDetails />
                  </Modal>
                }
              />

              <Route
                path="/feed/:id"
                element={
                  <Modal onClose={() => onCloseModalHandler("feedModal")}>
                    <FeedDetails />
                  </Modal>
                }
              />

              <Route
                path="/profile/orders/:number"
                element={
                  <Modal onClose={() => onCloseModalHandler("feedModal")}>
                    <FeedDetails />
                  </Modal>
                }
              />
            </Routes>
          )}
        </>
      ) : (
        <p className={`${styles.errorText} text text_type_main-large`}>
          {ERROR_TEXT}
        </p>
      )}
    </div>
  );
};
