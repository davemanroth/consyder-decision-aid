/**
 * React app entry point
 *
 * Author: Dave Rothfarb
 * Project: Consyder breast cancer decision aid
 * Health Communication Core 2019
 *
 * This is the React entry point that initializes Google Analytics and
 * renders the main decision aid App.js using ReactDOM.render
 */

import React from "react";
import ReactDOM from "react-dom";
import "babel-polyfill";
import "react-app-polyfill/ie11";
import ReactGA from "react-ga";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";

ReactGA.initialize("UA-140432869-1");

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById("root"));
registerServiceWorker();
