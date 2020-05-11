import { L_RANGE, C_RANGE, H_RANGE } from "utils/constants";

export const LCH_PROPERTIES: { [key: string]: any } = {
  l: { range: L_RANGE, title: "Lightness" },
  c: { range: C_RANGE, title: "Chroma" },
  h: { range: H_RANGE, title: "Hue" },
};
