import React from "react";
import { useSelector } from "react-redux";
import { ExtendedFirebaseInstance, useFirebase } from "react-redux-firebase";
import { useBeforeunload } from "react-beforeunload";

import { IconButton, Tooltip } from "@material-ui/core/";
import SaveIcon from "@material-ui/icons/Save";

import { RootState } from "app/rootReducer";
import { RowObject } from "../../colorGradients/types";
import { updateSchema } from "firebaseApi/crud";
import { useUserId, useContentHasChanged } from "utils/customHooks";

export default function SaveButton(): JSX.Element {
  const firebase: ExtendedFirebaseInstance = useFirebase();
  const schemaId: string = useSelector((state: RootState) => state.dropdown);
  const colorGradient: RowObject[] = useSelector(
    (state: RootState) => state.colorGradients
  );
  const userId = useUserId();
  const contentHasChanged = useContentHasChanged();

  async function handleOnClick() {
    await updateSchema(firebase, userId, schemaId, colorGradient);
  }

  useBeforeunload(() => {
    if (contentHasChanged) {
      updateSchema(firebase, userId, schemaId, colorGradient);
    }
  });

  return (
    <Tooltip
      title={
        userId
          ? "Your browser auto-saves your work, but this saves into our database"
          : "You must login for this function"
      }
    >
      <IconButton
        onClick={handleOnClick}
        disabled={!userId || !contentHasChanged}
      >
        <SaveIcon />
      </IconButton>
    </Tooltip>
  );
}
