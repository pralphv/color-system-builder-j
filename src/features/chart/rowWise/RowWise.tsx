import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";

import { Paper, makeStyles, Typography } from "@material-ui/core";

import Chart from "components/chart/Chart";

import { LCH_PROPERTIES } from "../constants";
import { Lch } from "utils/types";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

export default function RowWise(): JSX.Element {
  const classes = useStyles();

  const activeCell = useSelector((state: RootState) => state.activeCell);
  const activeRow = activeCell.row;
  const colorGradients = useSelector(
    (state: RootState) => state.colorGradients
  );
  const targetRow = colorGradients[activeRow].colorGradient;

  const rowValues: Lch[] = Object.values(targetRow).map(
    (colorObj) => colorObj.lch
  );

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography align="center" gutterBottom>
        Row-wise
      </Typography>
      {["l", "c", "h"].map((key: string, index: number) => (
        <Chart
          key={index}
          data={rowValues.map((lchObj, columnNumber: number) => ({
            x: columnNumber,
            y: lchObj[key],
          }))}
          label="Column"
          yRange={LCH_PROPERTIES[key].range}
          title={LCH_PROPERTIES[key].title}
        />
      ))}
    </Paper>
  );
}
