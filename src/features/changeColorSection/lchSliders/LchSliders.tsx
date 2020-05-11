import React from "react";
import { RootState } from "app/rootReducer";
import { useSelector, useDispatch } from "react-redux";

import LchSlider from "./LchSlider";
import { changeLchMiddleWare } from "./lchSlidersSlice";
import * as types from "./types";
import { L_RANGE, C_RANGE, H_RANGE } from "utils/constants";

export default function LchSliders(): JSX.Element {
  const dispatch = useDispatch();
  const lchSelector = useSelector((state: RootState) => state.lch);

  const lch: types.Lch = {
    Lightness: {
      range: L_RANGE,
      change: (value: number) => dispatch(changeLchMiddleWare({ l: value })),
      value: lchSelector.l,
    },
    Chroma: {
      range: C_RANGE,
      change: (value: number) => dispatch(changeLchMiddleWare({ c: value })),
      value: lchSelector.c,
    },
    Hue: {
      range: H_RANGE,
      change: (value: number) => dispatch(changeLchMiddleWare({ h: value })),
      value: lchSelector.h,
    },
  };

  return (
    <div>
      {Object.entries(lch).map(([id, obj]: [string, types.LchObject]) => (
        <LchSlider key={id} label={id} {...obj} />
      ))}
    </div>
  );
}
