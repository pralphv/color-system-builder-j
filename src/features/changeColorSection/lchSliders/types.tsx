import { LchRange } from "utils/types";

export interface LchObject {
  range: LchRange;
  change: (value: number) => any;
  value: number;
}

export interface Lch {
  [key: string]: LchObject;
}

export interface LchSliderProps {
  range: LchRange;
  change: (value: number) => any;
  value: number;
  label: string;
}
