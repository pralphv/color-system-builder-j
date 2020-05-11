import React from "react";
import { RootState } from "app/rootReducer";
import { useSelector } from "react-redux";

import { changeMiddleWare } from "./backgroundColorInputSlice";
import ColorInput from "components/colorInput/ColorInput";

export default function BackgroundColorInput(): JSX.Element {
  const value = useSelector((state: RootState) => state.backgroundColor);

  return <ColorInput label="Background" value={value} change={changeMiddleWare} />;
}
