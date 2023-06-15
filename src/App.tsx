import "./App.css";
import Header from "./components/Header";
import { routes } from "./routes";
import { useRoutes } from "react-router";
function App() {
  const element = useRoutes(routes);
  return (
    <div>
      <Header />
      {element}
    </div>
  );
}

export default App;
