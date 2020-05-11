import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ExtendedFirebaseInstance, useFirebase } from "react-redux-firebase";

import { IconButton, Tooltip } from "@material-ui/core/";
import PublishIcon from "@material-ui/icons/Publish";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import { RootState } from "app/rootReducer";
import { RowObject } from "../../colorGradients/types";
import { submitScheme } from "firebaseApi/crud";
import { useUserId, useContentHasChanged, useUserProfile } from "utils/customHooks";

import NotificationPopUp from "features/notificationPopUp/NotificationPopUp";

export default function SubmitButton(): JSX.Element {
  const firebase: ExtendedFirebaseInstance = useFirebase();
  const schemeId: string = useSelector((state: RootState) => state.dropdown);
  const colorGradient: RowObject[] = useSelector(
    (state: RootState) => state.colorGradients
  );
  const uid = useUserId();
  const profile = useUserProfile();
  const contentHasChanged = useContentHasChanged();
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const schemeName: string = profile[schemeId]?.name;

  function handleOnClick() {
    setOpenConfirmation(true);
  }
  function closeConfirmation() {
    setOpenConfirmation(false);
  }
  async function confirmedSubmit() {
    await submitScheme(firebase, uid, schemeId, {
      uid,
      colorGradient,
      likes: 0,
      name: schemeName
    });
    setShowPopUp(true);
    closeConfirmation()
  }

  return (
    <div>
      <Tooltip
        title={
          uid
            ? "Share your scheme with everyone"
            : "You must login for this function"
        }
      >
        <IconButton
          onClick={handleOnClick}
          disabled={!uid || contentHasChanged}
        >
          <PublishIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={openConfirmation} onClose={closeConfirmation}>
        <DialogTitle id="responsive-dialog-title">{"Submit?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to submit this color scheme? You will not be
            able to delete the submitted scheme after you submit.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeConfirmation} color="primary">
            Cancel
          </Button>
          <Button
            onClick={confirmedSubmit}
            color="primary"
            autoFocus
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <NotificationPopUp
        active={showPopUp}
        setState={setShowPopUp}
        text="Thank you for sharing your color scheme!"
      />
    </div>
  );
}
