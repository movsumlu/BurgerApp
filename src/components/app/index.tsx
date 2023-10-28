import { useState, useEffect } from "react";

import Header from "../header";
import Main from "../main";

import { apiURL } from "../../consts";

import styles from "./style.module.scss";

const App = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch(`${apiURL}/api/ingredients`)
      .then((response) => response.json())
      .then(({ data }) => setIngredients(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className={styles.app}>
      <Header />
      <Main ingredients={ingredients} />
    </div>
  );
};

export default App;
