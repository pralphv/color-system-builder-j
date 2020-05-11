import React from "react";

import BackgroundColorInput from "./backgroundColorInput/BackgroundColorInput";
import LightnessSlider from "./lightnessSlider/LightnessSlider";

import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

export default function SettingsSection(): JSX.Element {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.root}>
      <BackgroundColorInput />
      <LightnessSlider />
    </Paper>
  );
}
