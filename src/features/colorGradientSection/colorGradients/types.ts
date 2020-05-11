import { Lch } from "utils/types";

export interface ColorObject {
  hex: string;
  lch: Lch;
}

export interface RowObject {
  input: ColorObject;
  colorGradient: ColorObject[];
}

export interface Position {
  row: number;
  column: string | number;  // "input" is string, range(10) is number
}

export interface TargetColorBox {
  position: Position;
  colorObject: ColorObject;
}

export interface TargetColorRow {
  row: number;
  colorGradient: ColorObject[];
}
