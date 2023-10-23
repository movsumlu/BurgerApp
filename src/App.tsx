import "./App.scss";

import AppHeader from "./components/app-header/app-header";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";

function App() {
  return (
    <div className="App">
      <AppHeader />

      <main className="main">
        <section className="mainItem left">
          <BurgerIngredients />
        </section>

        <section className="mainItem right">
          <BurgerConstructor />
        </section>
      </main>
    </div>
  );
}

export default App;
