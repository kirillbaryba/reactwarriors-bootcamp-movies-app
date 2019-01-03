import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/index.css";
import { loginFormStore } from "./store/loginFormStore";
import { userStore } from "./store/userStore";
import { moviesPageStore } from "./store/moviesPageStore";
import { Provider } from "mobx-react";

ReactDOM.render(
  <Provider
    loginFormStore={loginFormStore}
    userStore={userStore}
    moviesPageStore={moviesPageStore}
  >
    <App />
  </Provider>,
  document.getElementById("root")
);
