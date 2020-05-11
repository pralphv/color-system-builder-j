import React from "react";

import { makeStyles, Grid } from "@material-ui/core";
import AddSchemeButton from "./addSchemeButton/AddSchemeButton";
import DeleteButton from "./deleteButton/DeleteButton";
import SaveButton from "./saveButton/SaveButton";
import Dropdown from "./schemaDropdown/SchemaDropdown";
import SubmitButton from "./submitButton/SubmitButton";
import { Toolbar as MuiToolbar } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: "1",
  },
});

export default function Toolbar(): JSX.Element {
  const classes = useStyles();

  return (
      
      <MuiToolbar style={{padding: 0}} variant="dense">
      <div className={classes.flex}>
        <Dropdown />
      </div>
      <Grid container justify="flex-end" >
        <AddSchemeButton />
        <SaveButton />
        <DeleteButton />
        <SubmitButton />
      </Grid>
    </MuiToolbar>
  );
}
