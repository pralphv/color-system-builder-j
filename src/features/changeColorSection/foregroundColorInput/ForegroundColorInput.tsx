import React from "react";
import { RootState } from "app/rootReducer";
import { useSelector } from "react-redux";

import { changeMiddleWare } from "./foregroundColorInputSlice";
import ColorInput from "components/colorInput/ColorInput";

export default function ForegroundColorInput(): JSX.Element {
  const value = useSelector((state: RootState) => state.foregroundColor);

  return <ColorInput label="Color" value={value} change={changeMiddleWare} />;
}
