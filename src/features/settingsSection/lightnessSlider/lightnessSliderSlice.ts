import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Range } from "./types";

const initialState: Range = { min: 0, max: 100 };

const lightnessSliderSlice = createSlice({
  name: "lightness",
  initialState,
  reducers: {
    change(state, action: PayloadAction<Range>) {
      state = action.payload;
      return state;
    },
  },
});

export const { change } = lightnessSliderSlice.actions;

export default lightnessSliderSlice.reducer;
