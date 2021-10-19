import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AppState from "./context/AppState";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <AppState>
      <App />
    </AppState>
  </React.StrictMode>,
  document.getElementById("root")
);
