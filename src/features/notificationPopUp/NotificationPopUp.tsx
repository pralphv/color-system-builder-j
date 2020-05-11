import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Snackbar, Typography, SnackbarContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  notification: {
    zIndex: 10000,
  },
  content: {
    background: "#353535",
    color: "#fff",
  },
}));

interface NotificationPopUpProps {
  active: boolean;
  setState: (state: boolean) => any;
  text: string;
}

export default function NotificationPopUp({
  active,
  setState,
  text,
}: NotificationPopUpProps): JSX.Element {
  const classes = useStyles();

  function handleClose() {
    setState(false);
  }

  return (
    <Snackbar
      className={classes.notification}
      open={active}
      onClose={handleClose}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <SnackbarContent
        className={classes.content}
        message={<Typography align="center">{text}</Typography>}
      />
    </Snackbar>
  );
}
