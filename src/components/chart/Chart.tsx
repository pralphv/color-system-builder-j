import React from "react";

import { Typography } from "@material-ui/core";

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { LchRange, Window } from "utils/types";
import { useWindow, useIsMobile } from "utils/customHooks";
import { TooltipProps } from "recharts";

interface LineChartObject {
  [key: string]: number;
}

interface ChartProps {
  data: LineChartObject[];
  label: string;
  yRange: LchRange;
  title: string;
}

export default function Chart({
  data,
  label,
  yRange,
  title,
}: ChartProps): JSX.Element {
  const { width }: Window = useWindow();
  const isMobile: boolean = useIsMobile();
  return (
    <div>
      <Typography align="center" gutterBottom>
        {title}
      </Typography>
      <LineChart
        width={isMobile? width * 0.85 : 250}
        height={125}
        data={data}
        margin={{
          left: -50,
        }}
      >
        <Tooltip
          content={(props: TooltipProps) => tooltipContent(props, title, label)}
        />
        <Line
          type="monotone"
          dataKey="y"
          stroke="#C0C0C0"
          activeDot={{ r: 4 }}
          isAnimationActive={false}
        />
        <XAxis dataKey="x" tick={false} />
        <YAxis tick={false} domain={[yRange.min, yRange.max]} />
      </LineChart>
    </div>
  );
}

export const TOOLTIP_STYLE = {
  background: "#4E4E4E",
  padding: "1em",
  boxShadow: "0px 1px 3px black",
};

function tooltipContent(
  tooltipProps: TooltipProps,
  title: string,
  label: string
) {
  const popUpObj = tooltipProps.payload && tooltipProps.payload[0];
  return (
    <div>
      {popUpObj && (
        <div style={TOOLTIP_STYLE}>
          <Typography variant="body2">
            {`${label}: ${popUpObj.payload.x + 1}`}
          </Typography>

          <Typography variant="body2">
            {`${title}: ${popUpObj.payload.y}`}
          </Typography>
        </div>
      )}
    </div>
  );
}
