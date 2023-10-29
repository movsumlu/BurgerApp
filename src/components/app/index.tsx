import { useState, useEffect } from "react";

import Header from "../header";
import Main from "../main";

import { apiURL } from "../../consts";

import styles from "./style.module.scss";

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [hasErrorsWithFetching, setHasErrorsWithFetching] = useState(false);

  useEffect(() => {
    fetch(`${apiURL}/api/ingredients`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setHasErrorsWithFetching(true);
          throw new Error("Response is not OK");
        }
      })
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
          При загрузке данных произошла ошибка. <br /> Повторите попытку
          попозже.
        </p>
      ) : (
        <>
          <Header />
          <Main ingredients={ingredients} />
        </>
      )}
    </div>
  );
};

export default App;
