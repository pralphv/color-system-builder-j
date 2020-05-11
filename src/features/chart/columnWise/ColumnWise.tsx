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

export default function ColumnWise(): JSX.Element {
  const classes = useStyles();

  const activeCell = useSelector((state: RootState) => state.activeCell);
  const activeColumn: number =
    activeCell.column === "input" ? 0 : parseInt(activeCell.column.toString());
  const colorGradients = useSelector(
    (state: RootState) => state.colorGradients
  );
  const targetColumn: Lch[] = Object.values(colorGradients).map(
    (obj) => obj.colorGradient[activeColumn].lch
  );

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography align="center" gutterBottom>
        Column-wise
      </Typography>
      {["l", "c", "h"].map((key: string, index: number) => (
        <Chart
          key={index}
          data={targetColumn.map((lchObj, rowNumber: number) => ({
            x: rowNumber,
            y: lchObj[key],
          }))}
          label="Row"
          yRange={LCH_PROPERTIES[key].range}
          title={LCH_PROPERTIES[key].title}
        />
      ))}
    </Paper>
  );
}
