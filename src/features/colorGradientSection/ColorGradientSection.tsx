import React from "react";

import Toolbar from "./toolbar/Toolbar";
import ColorGradients from "./colorGradients/ColorGradients";
import BottomToolbar from "./bottomToolbar/BottomToolbar";

import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

interface ColorGradientSectionProps{
  showTools: boolean
}

export default function ColorGradientSection({showTools}: ColorGradientSectionProps): JSX.Element {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.root}>
      {showTools && <Toolbar />}
      <ColorGradients />
      <BottomToolbar showTools={showTools}/>
    </Paper>
  );
}
