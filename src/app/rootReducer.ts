import { combineReducers } from "@reduxjs/toolkit";

import { firebaseReducer } from "react-redux-firebase";

import lch from "features/changeColorSection/lchSliders/lchSlidersSlice";
import foregroundColor from "features/changeColorSection/foregroundColorInput/foregroundColorInputSlice";

import backgroundColor from "features/settingsSection/backgroundColorInput/backgroundColorInputSlice";
import lightness from "features/settingsSection/lightnessSlider/lightnessSliderSlice";

import activeCell from "features/colorGradientSection/colorGradients/activeCellSlice";
import colorGradients from "features/colorGradientSection/colorGradients/colorGradientsSlice";
import dropdown from "features/colorGradientSection/toolbar/schemaDropdown/schemaDropdownSlice";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  dropdown,
  lch,
  foregroundColor,
  backgroundColor,
  lightness,
  activeCell,
  colorGradients,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
