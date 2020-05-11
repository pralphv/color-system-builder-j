import {
  createSlice,
  PayloadAction,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";

import { lch } from "color-convert";
import { AppThunk, AppDispatch } from "app/store";
import { RootState } from "app/rootReducer";
import { change } from "../foregroundColorInput/foregroundColorInputSlice";
import {
  changeColorMiddleWare,
  changeGradient,
} from "features/colorGradientSection/colorGradients/colorGradientsSlice";

import { ColorObject } from "features/colorGradientSection/colorGradients/types";

import { Lch } from "utils/types";

const initialState: Lch = { l: 0, c: 0, h: 0 };

const lchSlidersSlice = createSlice({
  name: "lch",
  initialState,
  reducers: {
    changeL(state, action: PayloadAction<number>) {
      state.l = action.payload;
      return state;
    },
    changeC(state, action: PayloadAction<number>) {
      state.c = action.payload;
      return state;
    },
    changeH(state, action: PayloadAction<number>) {
      state.h = action.payload;
      return state;
    },
  },
});

export const { changeL, changeC, changeH } = lchSlidersSlice.actions;

interface NumberValueObject {
  [key: string]: number;
}

interface FunctionMap {
  [key: string]: ActionCreatorWithPayload<number, string>;
}

const functionMap: FunctionMap = {
  l: changeL,
  c: changeC,
  h: changeH,
};

export const changeLchMiddleWare = (
  numberObject: NumberValueObject
): AppThunk => async (dispatch: AppDispatch, getState: () => RootState) => {
  const keyValue: string = Object.keys(numberObject)[0];
  const value: number = Object.values(numberObject)[0];
  const changeFunction: ActionCreatorWithPayload<number, string> =
    functionMap[keyValue];
  dispatch(changeFunction(value));
  const lchObj: Lch = getState().lch;
  let hex_: string = lch.hex([lchObj.l, lchObj.c, lchObj.h]);
  hex_ = "#" + hex_;

  const colorObject: ColorObject = {
    hex: hex_,
    lch: lchObj,
  };

  dispatch(changeColorMiddleWare(colorObject));
  dispatch(change(hex_));

  const activeCell = getState().activeCell;
  if (activeCell.column === "input") {
    dispatch(changeGradient());
  }
};

export default lchSlidersSlice.reducer;
