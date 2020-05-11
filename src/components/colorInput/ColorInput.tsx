import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  ClickAwayListener,
  Typography,
  Input,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { ChromePicker } from "react-color";

const useStyles = makeStyles({
  root: {
    // flexGrow: 1,
  },
  colorPicker: {
    position: "absolute",
    zIndex: 1100,
    marginLeft: "-150px",
  },
});

interface ColorInputProps {
  label: string;
  value: string;
  change: (value: string) => any;
}

function trimChar(value: string, charToRemove: string): string {
  while (value.charAt(0) === charToRemove) {
    value = value.substring(1);
  }
  return value;
}

export default function ColorInput({
  label,
  value,
  change,
}: ColorInputProps): JSX.Element {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const [localValue, setLocalValue] = useState<string>(value);

  function handleColorPickerOnChange(e: any) {
    let hex: string = e.hex;
    dispatch(change(hex));
  }

  function handleInputOnChange(e: any) {
    let hex: string = e.target.value;
    setLocalValue(hex);
  }

  function handleInputOnBlur(e: any) {
    let hex: string = e.target.value;
    hex = trimChar(hex, "#");
    if (hex.length !== 6) {
      setLocalValue(value);
      return;
    }
    hex = "#" + hex;
    dispatch(change(hex));
    setLocalValue(hex);
  }

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={8}>
        <Typography gutterBottom>{label}</Typography>
      </Grid>
      <Grid item xs={4}>
        <ClickAwayListener onClickAway={() => setDisplayColorPicker(false)}>
          <div>
            <Input
              onBlur={handleInputOnBlur}
              onChange={handleInputOnChange}
              value={localValue}
              onClick={() => setDisplayColorPicker(true)}
            />
            {displayColorPicker && (
              <div className={classes.colorPicker}>
                <ChromePicker
                  color={value}
                  onChangeComplete={handleColorPickerOnChange}
                />
              </div>
            )}
          </div>
        </ClickAwayListener>
      </Grid>
    </Grid>
  );
}
