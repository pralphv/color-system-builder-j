import React from "react";

import { Grid } from "@material-ui/core";

import CopyButtons from "./copyButtons/CopyButtons";
import AddRemoveButtons from "./addRemoveButtons/AddRemoveButtons";

interface BottomToolbar {
  showTools: boolean;
}

export default function BottomToolbar({
  showTools,
}: BottomToolbar): JSX.Element {
  return (
    <div>
      {showTools && (
        <Grid container justify="center">
          <AddRemoveButtons />
        </Grid>
      )}

      <br />
      <Grid container justify="center">
        <CopyButtons />
      </Grid>
    </div>
  );
}
