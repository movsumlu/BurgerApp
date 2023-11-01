import { useState, useEffect } from "react";

import Header from "../header";
import Main from "../main";

import { apiURL } from "../../consts";
import { checkResponse } from "../../utils/burger-API";

import { BurgerConstructorContext } from "../../services/burgerConstructorContext";

import styles from "./style.module.scss";

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [hasErrorsWithFetching, setHasErrorsWithFetching] = useState(false);

  const errorText =
    "При загрузке данных произошла ошибка. Повторите попытку попозже.";

  useEffect(() => {
    fetch(`${apiURL}/api/ingredients`)
      .then(checkResponse)
      .then(({ data }) => setIngredients(data))
      .catch((error) => {
        setHasErrorsWithFetching(true);
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.app}>
      {hasErrorsWithFetching ? (
        <p className={`${styles.errorText} text text_type_main-large`}>
          {errorText}
        </p>
      ) : (
        <>
          <Header />

          <BurgerConstructorContext.Provider value={{ ingredients }}>
            <Main />
          </BurgerConstructorContext.Provider>
        </>
      )}
    </div>
  );
};

export default App;
