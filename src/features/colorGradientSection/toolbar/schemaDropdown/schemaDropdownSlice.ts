import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppThunk, AppDispatch } from "app/store";
import { RootState } from "app/rootReducer";

const initialState: string = "";

const dropdownSlice = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    change(state, action: PayloadAction<string>) {
      state = action.payload;
      return state;
    },
  },
});

export const { change } = dropdownSlice.actions;

export const changeSchemaMiddleWare = (id: string): AppThunk => async (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  dispatch(change(id));
  // dispatch(changeSchemaMiddleWare());
};

export default dropdownSlice.reducer;
