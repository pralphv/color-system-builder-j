import React from "react";
import { useDispatch } from "react-redux";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import {
  addMiddleWare,
  removeMiddleWare,
} from "../../colorGradients/colorGradientsSlice";

export default function AddRemoveButtons(): JSX.Element {
  const dispatch = useDispatch();

  return (
    <ButtonGroup size="small">
      <Button
        variant="contained"
        onClick={() => dispatch(addMiddleWare())}
        color="primary"
      >
        Add
      </Button>
      <Button onClick={() => dispatch(removeMiddleWare())} >
        Remove
      </Button>
    </ButtonGroup>
  );
}
