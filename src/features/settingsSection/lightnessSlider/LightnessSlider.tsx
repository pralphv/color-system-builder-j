import React from "react";
import { RootState } from "app/rootReducer";
import { useSelector, useDispatch } from "react-redux";

import { Typography, Slider } from "@material-ui/core";

import { change } from "./lightnessSliderSlice";
import { Range } from "./types";

export default function LchSliders(): JSX.Element {
  const dispatch = useDispatch();
  const lightnessObj: Range = useSelector(
    (state: RootState) => state.lightness
  );

  return (
    <div>
      <Typography gutterBottom>Lightness range</Typography>
      <Slider
        value={[lightnessObj.min, lightnessObj.max]}
        onChange={(e, newValue: any) =>
          dispatch(change({ min: newValue[0], max: newValue[1] }))
        }
        valueLabelDisplay="auto"
      />
    </div>
  );
}
