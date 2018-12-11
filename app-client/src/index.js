import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import { AuthenticationProvider } from './Contexts/AuthenticationContext/AuthenticationContext';
import App from "./Components/App/App";
import "./index.css";

ReactDOM.render(
  <AuthenticationProvider>
    <Router>
      <App/>
    </Router>
  </AuthenticationProvider>,
  document.getElementById(`root`)
);
registerServiceWorker();
