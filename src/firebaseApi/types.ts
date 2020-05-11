import { RowObject } from "features/colorGradientSection/colorGradients/types";

export interface Resp {
    status: string;
    message: any;
  }

export interface GenericObject{
  [key: string]: any
}

export interface Scheme {
  name: string;
  colorGradient: RowObject[];
}