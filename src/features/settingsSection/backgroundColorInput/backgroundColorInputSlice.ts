import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppThunk, AppDispatch } from "app/store";
import { RootState } from "app/rootReducer";

const initialState: string = "#ffffff";

const backgroundColorInputSlice = createSlice({
  name: "backgroundColorInput",
  initialState,
  reducers: {
    change(state, action: PayloadAction<string>) {
      state = action.payload;
      return state;
    },
  },
});

export const { change } = backgroundColorInputSlice.actions;

export const changeMiddleWare = (value: string): AppThunk => async (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  dispatch(change(value));
};

export default backgroundColorInputSlice.reducer;
