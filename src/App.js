import React from "react";
import "./App.css";
import routes from "./routes";
import Nav from "./components/nav/Nav";
import "./reset.css";

function App() {
  return (
    <div className="App">
      <Nav />
      {routes}
    </div>
  );
}

export default App;
