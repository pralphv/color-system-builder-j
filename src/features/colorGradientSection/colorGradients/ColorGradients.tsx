import React from "react";
import { RootState } from "app/rootReducer";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles, Grid } from "@material-ui/core";
import { hex as calculateContrast } from "wcag-contrast";

import ColorBox from "./ColorBox";
import * as types from "./types";
import { changeMiddleWare } from "./activeCellSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  margins: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function chooseColor(color: string): string {
  color = calculateContrast(color, "#fff") > 3.5 ? "#fff" : "#000";
  return color;
}

export default function ColorGradients(): JSX.Element {
  const classes = useStyles();

  const backgroundColor: string = useSelector(
    (state: RootState) => state.backgroundColor
  );

  const colorGradients: types.RowObject[] = useSelector(
    (state: RootState) => state.colorGradients
  );

  const activeCell: types.Position = useSelector(
    (state: RootState) => state.activeCell
  );

  const dispatch = useDispatch();

  function changeActiveCell(row: number, column: string | number) {
    dispatch(changeMiddleWare({ row, column }));
  }

  function checkIsActive(row: number, column: string | number): boolean {
    return activeCell.row === row && activeCell.column === column;
  }

  return (
    <div className={classes.margins}>
      {colorGradients.length > 0 && colorGradients.map(
        (rowObject: types.RowObject, rowIndex: number) => (
          <Grid key={rowIndex} container className={classes.root}>
            <Grid
              item
              xs={1}
              onClick={() => changeActiveCell(rowIndex, "input")}
            >
              <ColorBox
                background={rowObject.input.hex}
                isInputBox
                isActive={checkIsActive(rowIndex, "input")}
                textColor={chooseColor(rowObject.input.hex)}
              />
            </Grid>
            <Grid item xs={1} />
            {Object.entries(rowObject.colorGradient).map(
              ([gradientIndex, colorObject]: [string, types.ColorObject]) => (
                <Grid
                  item
                  xs={1}
                  key={gradientIndex}
                  onClick={() => changeActiveCell(rowIndex, gradientIndex)}
                >
                  <ColorBox
                    contrastValue={calculateContrast(
                      colorObject.hex,
                      backgroundColor
                    ).toFixed(1)}
                    background={colorObject.hex}
                    textColor={chooseColor(colorObject.hex)}
                    isActive={checkIsActive(rowIndex, gradientIndex)}
                  />
                </Grid>
              )
            )}
          </Grid>
        )
      )}
    </div>
  );
}
