import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { lch as lchConverter } from "color-convert";

import { AppThunk, AppDispatch } from "app/store";
import { RootState } from "app/rootReducer";

import { LCH } from "color-convert/conversions";

import { changeMiddleWare } from "./activeCellSlice";
import * as types from "./types";
import { Lch } from "utils/types";
import { convertHexToLch } from "utils/helper";

const defaultHex = "#ffffff";
const defaultLch: Lch = { l: 100, c: 0, h: 360 };

const defaultGradient: types.RowObject = {
  input: {
    hex: defaultHex,
    lch: defaultLch,
  },
  colorGradient: Array(10)
    .fill(0)
    .map((_) => ({ hex: defaultHex, lch: defaultLch })),
};

export const initialState: types.RowObject[] = [defaultGradient];

const colorGradientsSlice = createSlice({
  name: "colorGradients",
  initialState,
  reducers: {
    add(state, action: PayloadAction<number>) {
      state[action.payload] = defaultGradient;
      return state;
    },
    remove(state, action: PayloadAction<number>) {
      state.splice(action.payload, 1);
      return state;
    },
    reset() {
      return initialState;
    },
    changeColor(state, action: PayloadAction<types.TargetColorBox>) {
      const position = action.payload.position;
      const colorObject = action.payload.colorObject;
      if (position.column === "input") {
        state[position.row].input = colorObject;
      } else {
        state[position.row].colorGradient[
          parseInt(position.column.toString())  // column type is string | number. shouldve kept it single
        ] = colorObject;
      }
      return state;
    },
    changeColorRow(state, action: PayloadAction<types.TargetColorRow>) {
      state[action.payload.row].colorGradient = action.payload.colorGradient;
      return state;
    },
    changeSchema(state, action: PayloadAction<types.RowObject[]>) {
      state = action.payload;
      return state;
    },
  },
});

export const {
  add,
  remove,
  reset,
  changeColor,
  changeColorRow,
  changeSchema,
} = colorGradientsSlice.actions;

export const addMiddleWare = (): AppThunk => async (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  const rows: types.RowObject[] = getState().colorGradients;
  if (Object.keys(rows).length < 20) {
    const keys: string[] = Object.keys(rows);
    const length: number = keys.length;
    const newKey: number = parseInt(keys[length - 1]) + 1;
    dispatch(add(newKey));
    dispatch(changeMiddleWare({ row: newKey, column: "input" }));
  }
};

export const removeMiddleWare = (): AppThunk => async (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  // after removing 1 row, auto focus on last row, input box
  const rows: types.RowObject[] = getState().colorGradients;
  if (Object.keys(rows).length === 1) {
    return;
  }
  const activeCell: types.Position = getState().activeCell;
  dispatch(remove(activeCell.row));
  const lastRowIndex: number = getState().colorGradients.length - 1;
  dispatch(changeMiddleWare({ row: lastRowIndex, column: "input" }));
};

export const changeColorWithHexMiddleWare = (
  background: string
): AppThunk => async (dispatch: AppDispatch, getState: () => RootState) => {
  const position: types.Position = getState().activeCell;
  const lch: LCH = convertHexToLch(background);
  const colorObject: types.ColorObject = {
    hex: background,
    lch: {
      l: lch[0],
      c: lch[1],
      h: lch[2],
    },
  };

  dispatch(changeColor({ position, colorObject }));
};

export const changeColorMiddleWare = (
  colorObject: types.ColorObject
): AppThunk => async (dispatch: AppDispatch, getState: () => RootState) => {
  const position: types.Position = getState().activeCell;
  dispatch(changeColor({ position, colorObject }));
};

export const changeGradient = (): AppThunk => async (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  const lch = getState().lch;
  const lightness = getState().lightness;
  const activeCell = getState().activeCell;

  const step = (lightness.max - lightness.min) / 9;
  const lArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((elem: number) =>
    Math.round(lightness.min + elem * step)
  );

  const colorGradientObject: types.ColorObject[] = lArray.map(
    (lValue: number) => {
      const background = `#${lchConverter.hex([lValue, lch.c, lch.h])}`;
      const colorObject: types.ColorObject = {
        hex: background,
        lch: {
          l: lValue,
          c: lch.c,
          h: lch.h,
        },
      };
      return colorObject;
    }
  );
  dispatch(
    changeColorRow({
      row: activeCell.row,
      colorGradient: colorGradientObject,
    })
  );
};

export const changeSchemaMiddleWare = (): AppThunk => async (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  dispatch(changeMiddleWare({ row: 0, column: "input" }));
  const chosenSchemaId: string = getState().dropdown;
  const colorGradient = getState().firebase.profile[chosenSchemaId]
    .colorGradient;
  dispatch(changeSchema(colorGradient));
};

export default colorGradientsSlice.reducer;
