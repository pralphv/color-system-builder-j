import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppThunk, AppDispatch } from "app/store";
import { RootState } from "app/rootReducer";
import { change as changeForegroundInputValue } from "features/changeColorSection/foregroundColorInput/foregroundColorInputSlice";
import * as types from "./types";

import {
  changeL,
  changeC,
  changeH,
} from "features/changeColorSection/lchSliders/lchSlidersSlice";

const initialState: types.Position = { row: 0, column: "input" };

const activeCellSlice = createSlice({
  name: "activeCell",
  initialState,
  reducers: {
    change(state, action: PayloadAction<types.Position>) {
      state = action.payload;
      return state;
    },
  },
});

export const { change } = activeCellSlice.actions;

export const changeMiddleWare = (position: types.Position): AppThunk => async (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  dispatch(change(position));
  const colorObject: types.ColorObject =
    position.column === "input"
      ? getState().colorGradients[position.row].input
      : getState().colorGradients[position.row].colorGradient[
          parseInt(position.column.toString())
        ];
  // position.column type is string | number. shouldve kept it single
  dispatch(changeForegroundInputValue(colorObject.hex));
  dispatch(changeL(colorObject.lch.l));
  dispatch(changeC(colorObject.lch.c));
  dispatch(changeH(colorObject.lch.h));
};

export default activeCellSlice.reducer;
