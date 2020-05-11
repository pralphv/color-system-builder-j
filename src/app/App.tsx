import React from "react";

import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import "./App.css";
import MainLayout from "../layouts/mainLayout";
import { THEME } from "./theme";
import firebase from "firebaseApi";
import store from "./store";

const rrfConfig = {
  userProfile: "users",
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

export default function App() {
  return (
    <ReactReduxFirebaseProvider {...rrfProps}>
      <ThemeProvider theme={THEME}>
        <CssBaseline />
        <MainLayout />
      </ThemeProvider>
    </ReactReduxFirebaseProvider>
  );
}
