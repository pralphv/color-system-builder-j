import { configureStore, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { throttle } from "lodash";

import rootReducer, { RootState } from "./rootReducer";
import { loadState, saveState } from "localStorage/api";
import { Pages } from "layouts/constants";

const loadedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadedState,
});

store.subscribe(
  throttle(() => {
    const notLoggedIn = store.getState().firebase.auth.isEmpty;
    const isPageMySchemes = window.location.pathname === Pages.MySchemes;
    if (notLoggedIn && isPageMySchemes) {
      saveState(store.getState());
    }
  }, 2000)
);

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./rootReducer", () => {
    const newRootReducer = require("./rootReducer").default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
