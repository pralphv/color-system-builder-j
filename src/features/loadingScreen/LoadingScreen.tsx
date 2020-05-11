import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";

import { useUserProfile } from "utils/customHooks";

const useStyles = makeStyles(() => ({
  backdrop: {
    background: "#000",
    zIndex: 10000,
  },
}));

export default function LoadingScreen() {
  const classes = useStyles();
  const profile = useUserProfile();
  return (
    <Backdrop className={classes.backdrop} open={!profile.isLoaded}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
