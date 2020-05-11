import React, { useState } from "react";
import { RootState } from "app/rootReducer";
import { useSelector } from "react-redux";

import { Button, ButtonGroup } from "@material-ui/core";

import NotificationPopUp from "features/notificationPopUp/NotificationPopUp";

export default function CopyButtons(): JSX.Element {
  const activeCell = useSelector((state: RootState) => state.activeCell);
  const colorGradients = useSelector(
    (state: RootState) => state.colorGradients
  );

  const [showPopUp, setShowPopUp] = useState(false);

  function copyRow() {
    const targetRow = colorGradients[activeCell.row].colorGradient;
    const hexArray: string[] = Object.values(targetRow).map((obj) => obj.hex);
    const rowValuesJson: string = JSON.stringify(Object.values(hexArray));
    navigator.clipboard.writeText(rowValuesJson);
    setShowPopUp(true);
  }

  function copyColumn() {
    const column = activeCell.column;
    const hexValues: string[] = Object.values(colorGradients).map(
      (obj) => obj.colorGradient[parseInt(column.toString())].hex
    );
    const columnValuesJson: string = JSON.stringify(hexValues);
    navigator.clipboard.writeText(columnValuesJson);
    setShowPopUp(true);
  }

  return (
    <div>
      <ButtonGroup variant="contained" size="small">
        <Button onClick={copyRow} color="primary">
          Copy row
        </Button>
        <Button
          onClick={copyColumn}
          color="primary"
          disabled={activeCell.column === "input"}
        >
          Copy column
        </Button>
      </ButtonGroup>
      <NotificationPopUp
        active={showPopUp}
        setState={setShowPopUp}
        text="Copied to Clipboard"
      />
    </div>
  );
}
