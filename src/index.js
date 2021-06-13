import React, { StrictMode } from "react";
import { render } from "react-dom";
import App from "App"
import { unregister } from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./redux/store/index";
import {
  Router, Route
} from "react-router-dom";
import history from './history';
// //import fonts

import 'assets/fonts/BarlowCondensed-Regular.ttf'
import 'assets/fonts/BarlowCondensed-Medium.ttf'
import 'assets/fonts/BarlowCondensed-MediumItalic.ttf'
import 'assets/fonts/BarlowCondensed-SemiBold.ttf'
import 'assets/fonts/BarlowCondensed-Bold.ttf'
import 'assets/fonts/RobotoSlab-Regular.ttf'
import 'assets/fonts/RobotoSlab-Medium.ttf'
import 'assets/fonts/Rosario-Bold.ttf'
import 'assets/fonts/Roboto-Regular.ttf'
import 'assets/fonts/Roboto-Medium.ttf'
import 'assets/fonts/Barlow-SemiBold.ttf'
import 'assets/fonts/BarlowSemiCondensed-BoldItalic.ttf'
import 'assets/fonts/BarlowSemiCondensed-MediumItalic.ttf'
import 'assets/fonts/BarlowSemiCondensed-Medium.ttf'
import 'assets/fonts/BarlowSemiCondensed-Bold.ttf'
import 'assets/fonts/BarlowSemiCondensed-SemiBold.ttf'

import 'style.css'
import authService from 'authentication/authenticationServices.js'

const renderApp = () => render(
  <StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <Route component={App} />
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);

authService.initKeycloak(renderApp);
unregister();