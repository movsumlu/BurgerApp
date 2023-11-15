import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "components/header";
import Main from "components/main";

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
      {errors ? (
        <p className={`${styles.errorText} text text_type_main-large`}>
          {ERROR_TEXT}
        </p>
      ) : (
        <>
          <Header />
          <Main />
        </>
      )}
    </div>
  );
};

export default App;
