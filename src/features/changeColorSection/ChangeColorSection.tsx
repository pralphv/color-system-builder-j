import React from "react";

import LchSliders from "./lchSliders/LchSliders";
import ForegroundColorInput from "./foregroundColorInput/ForegroundColorInput";

import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

export default function ChangeColorSection(): JSX.Element {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.root}>
      <ForegroundColorInput />
      <LchSliders />
    </Paper>
  );
}
