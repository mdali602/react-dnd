import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import AppDragDropDemo from "./AppDragDropDemo";

ReactDOM.render(
  <Provider store={configureStore()}>
    <AppDragDropDemo />
  </Provider>,
  document.getElementById("root")
);
