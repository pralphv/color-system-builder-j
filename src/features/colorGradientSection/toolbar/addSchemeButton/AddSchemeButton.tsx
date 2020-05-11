import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import { useFirebase, ExtendedFirebaseInstance } from "react-redux-firebase";

import { IconButton, Tooltip } from "@material-ui/core/";
import AddIcon from "@material-ui/icons/Add";

import { createSchema, updateSchema } from "firebaseApi/crud";
import { useUserId } from "utils/customHooks";
import { initialState } from "../../colorGradients/colorGradientsSlice";
import { change as changeScheme } from "../schemaDropdown/schemaDropdownSlice";
import { changeSchemaMiddleWare as changeSchemeNextSteps } from "../../colorGradients/colorGradientsSlice";
import { RowObject } from "../../colorGradients/types";

export default function AddSchemeButton(): JSX.Element {
  const dispatch = useDispatch();
  const firebase: ExtendedFirebaseInstance = useFirebase();
  const userId: string = useUserId();
  const schemaId: string = useSelector((state: RootState) => state.dropdown);
  const colorGradient: RowObject[] = useSelector(
    (state: RootState) => state.colorGradients
  );

  async function handleOnClick() {
    updateSchema(firebase, userId, schemaId, colorGradient);
    const resp = await createSchema(firebase, userId, {
      colorGradient: initialState,
      name: "New",
    });
    dispatch(changeScheme(resp.message.key));
    dispatch(changeSchemeNextSteps());
  }

  return (
    <Tooltip title="Add Scheme" onClick={handleOnClick}>
      <IconButton disabled={!userId}>
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
}
