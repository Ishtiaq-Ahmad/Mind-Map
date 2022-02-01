import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import NodeContext from "./Context/auth/AuthState";
import MultiTabState from "./Context/multiTab/MultiTabState";
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
  <BrowserRouter>
    <NodeContext>
      <MultiTabState>
        <App />
      </MultiTabState>
    </NodeContext>
  </BrowserRouter>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
