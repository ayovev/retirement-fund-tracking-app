import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthenticationProvider } from './AuthenticationContext';

ReactDOM.render(
  <AuthenticationProvider>
    <Router>
      <App/>
    </Router>
  </AuthenticationProvider>,
  document.getElementById(`root`)
);
registerServiceWorker();
