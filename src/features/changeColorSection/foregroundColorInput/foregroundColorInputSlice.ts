import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppThunk, AppDispatch } from "app/store";

import { changeL, changeC, changeH } from "../lchSliders/lchSlidersSlice";
import {
  changeColorWithHexMiddleWare as changeColorBoxColor,
  changeGradient,
} from "features/colorGradientSection/colorGradients/colorGradientsSlice";
import { RootState } from "app/rootReducer";
import { convertHexToLch } from "utils/helper";

const initialState: string = "#ffffff";

const foregroundColorInputSlice = createSlice({
  name: "foregroundColorInput",
  initialState,
  reducers: {
    change(state, action: PayloadAction<string>) {
      state = action.payload;
      return state;
    },
  },
});

export const { change } = foregroundColorInputSlice.actions;

export const changeMiddleWare = (value: string): AppThunk => async (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  dispatch(change(value));
  dispatch(changeColorBoxColor(value));
  let lch = convertHexToLch(value);
  dispatch(changeL(lch[0]));
  dispatch(changeC(lch[1]));
  dispatch(changeH(lch[2]));

  const activeCell = getState().activeCell;
  if (activeCell.column === "input") {
    dispatch(changeGradient());
  }
};

export default foregroundColorInputSlice.reducer;
