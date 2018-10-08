import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './AuthContext';

ReactDOM.render(
  <AuthProvider>
      <Router>
        <App/>
      </Router>
  </AuthProvider>,
  document.getElementById(`root`)
);
registerServiceWorker();
