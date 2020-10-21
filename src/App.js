import React from "react";
import "./App.css";
import { useLocation } from "react-router-dom";
import routes from "./routes";
import Nav from "./components/nav/Nav";
import "./reset.css";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="App">
      {pathname !== "/" && <Nav />}
      {routes}
    </div>
  );
}

export default App;
