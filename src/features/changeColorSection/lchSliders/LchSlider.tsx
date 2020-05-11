import React from "react";

import { Typography, Slider, Input, makeStyles, Grid } from "@material-ui/core";

import * as types from "./types";

const useStyles = makeStyles({
  input: {
    // width: 42,
  },
  root: {
    flexGrow: 1,
  },
});

export default function LchSlider({
  label,
  range,
  change,
  value,
}: types.LchSliderProps): JSX.Element {
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={8}>
          <Typography gutterBottom>{label}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Input
            className={classes.input}
            value={value}
            onChange={(e) => change(parseInt(e.target.value))}
            inputProps={{
              step: 1,
              min: range.min,
              max: range.max,
              type: "number",
            }}
          />
        </Grid>
      </Grid>
      <Slider
        value={value}
        onChange={(e, newValue: any) => change(newValue)}
        max={range.max}
      />
    </div>
  );
}
