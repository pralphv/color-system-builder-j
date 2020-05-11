import React, { useState } from "react";

import { Typography, makeStyles } from "@material-ui/core";
import CopyToClipboard from "react-copy-to-clipboard";

import NotificationPopUp from "features/notificationPopUp/NotificationPopUp";

const useStyles = makeStyles({
  colorBox: {
    // width: "25px",
    height: "40px",
    cursor: "pointer",
    textAlign: "center",
  },
  root: {
    flexGrow: 1,
  },
});

interface ColorBoxProps {
  contrastValue?: string;
  background: string;
  textColor?: string;
  isInputBox?: boolean;
  isActive: boolean;
}

export default function ColorBox({
  contrastValue = "",
  background,
  textColor,
  isInputBox = false,
  isActive,
}: ColorBoxProps): JSX.Element {
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const classes = useStyles();
  const boxShadow = isActive ? `0 0 5px ${textColor} inset` : "";
  return (
    <div>
      {isInputBox ? (
        <div
          className={classes.colorBox}
          style={{ background, color: textColor, boxShadow }}
        ></div>
      ) : (
        <CopyToClipboard
          text={isInputBox ? "" : background}
          onCopy={() => setShowPopUp(true)}
        >
          <div
            className={classes.colorBox}
            style={{ background, color: textColor, boxShadow }}
          >
            <Typography variant="caption">{contrastValue}</Typography>
          </div>
        </CopyToClipboard>
      )}
      <NotificationPopUp
        active={showPopUp}
        setState={setShowPopUp}
        text="Copied to Clipboard"
      />
    </div>
  );
}
