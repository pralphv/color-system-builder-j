import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ExtendedFirebaseInstance, useFirebase } from "react-redux-firebase";

import { IconButton, Tooltip } from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import { RootState } from "app/rootReducer";
import { deleteScheme, createSchema } from "firebaseApi/crud";
import { useUserId, useUserProfile } from "utils/customHooks";
import {
  changeSchemaMiddleWare as changeSchemeNextSteps,
  initialState,
} from "../../colorGradients/colorGradientsSlice";
import { change as changeScheme } from "../schemaDropdown/schemaDropdownSlice";

export default function DeleteButton(): JSX.Element {
  const dispatch = useDispatch();
  const firebase: ExtendedFirebaseInstance = useFirebase();
  const schemeId: string = useSelector((state: RootState) => state.dropdown);
  const schemes: string[] = Object.keys(useUserProfile()).filter(
    (value) => value !== "isEmpty" && value !== "isLoaded"
  );
  const userId = useUserId();
  const [open, setOpen] = useState<boolean>(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function confirmedDelete() {
    const remainingSchemes: string[] = schemes.filter(
      (value) => value !== schemeId
    );
    await deleteScheme(firebase, userId, schemeId);
    if (remainingSchemes.length === 0) {
      const resp = await createSchema(firebase, userId, {
        colorGradient: initialState,
        name: "New",
      });
      dispatch(changeScheme(resp.message.key));
      dispatch(changeSchemeNextSteps());
    } else {
      dispatch(changeScheme(remainingSchemes[0]));
      dispatch(changeSchemeNextSteps());
    }
    setOpen(false);
  }

  return (
    <div>
      <Tooltip title="Delete this color scheme">
        <IconButton onClick={handleClickOpen} disabled={!userId}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="responsive-dialog-title">{"Delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this color scheme?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={confirmedDelete}
            color="primary"
            autoFocus
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
