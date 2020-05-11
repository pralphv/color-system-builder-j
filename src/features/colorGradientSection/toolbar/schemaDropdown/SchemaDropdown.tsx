import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import { ExtendedFirebaseInstance, useFirebase } from "react-redux-firebase";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { change } from "./schemaDropdownSlice";
import {
  changeSchemaMiddleWare,
  changeSchema as changeColorGradient,
} from "../../colorGradients/colorGradientsSlice";
import { changeMiddleWare as changeActiveCell } from "../../colorGradients/activeCellSlice";

import { renameSchema, updateSchema } from "firebaseApi/crud";
import {
  useUserId,
  useUserProfile,
  useContentHasChanged,
} from "utils/customHooks";
import "./styles.css";
import { Scheme } from "./types";
import { RowObject } from "../../colorGradients/types";
import { loadState } from "localStorage/api";

export default function Dropdown(): JSX.Element {
  const dispatch = useDispatch();
  const firebase: ExtendedFirebaseInstance = useFirebase();
  const userId: string = useUserId();
  const profile = useUserProfile();
  const contentHasChanged = useContentHasChanged();
  const currentSchemeId: string = useSelector(
    (state: RootState) => state.dropdown
  );
  const schemaId: string = useSelector((state: RootState) => state.dropdown);
  const colorGradient: RowObject[] = useSelector(
    (state: RootState) => state.colorGradients
  );

  let currentSchemeName: string = profile[currentSchemeId]?.name;
  const [originalValue, setOriginalValue] = useState<any>({
    name: currentSchemeName,
    id: currentSchemeId,
  });

  let schemas: Scheme[] = Object.entries(profile).map(
    ([key, obj]: [string, any]) => ({
      id: key,
      name: obj.name,
    })
  );
  schemas = schemas.filter((obj: Scheme) => obj.name !== undefined);

  function handleOnChange(newValue: Scheme) {
    // change scheme
    if (!newValue) {
      return;
    }
    if (originalValue.id !== newValue.id) {
      if (contentHasChanged) {
        updateSchema(firebase, userId, schemaId, colorGradient);
      }
      dispatch(change(newValue.id));
      setOriginalValue(newValue);
      dispatch(changeSchemaMiddleWare());
    }
  }

  function handleOnBlur(e: any) {
    // rename
    const newValue: string = e.target.value;
    if (originalValue.name !== newValue) {
      renameSchema(firebase, userId, originalValue.id, newValue);
      setOriginalValue({ id: originalValue.id, name: newValue });
    }
  }

  // should probably be in page?
  useEffect(() => {
    const length = Object.keys(profile).length;
    if (length > 2) {
      // first 2 are isEmpty, isLoading. must be signed in for this
      const [id, obj]: [string, any] = Object.entries(profile)[0];
      if (!currentSchemeId) {
        // initialization
        dispatch(change(id));
        setOriginalValue({ id, name: obj.name });
        dispatch(changeSchemaMiddleWare());
      }
    } else if (!userId) {
      // if not logged in, try load from local storage
      const localStorageState = loadState();
      if (localStorageState) {
        dispatch(changeColorGradient(localStorageState.colorGradients));
        dispatch(changeActiveCell({ row: 0, column: "input" }));
      }
    }
  }, [profile, currentSchemeId, dispatch, userId]);

  useEffect(() => {
    // when a new scheme is added, focus on the new scheme
    setOriginalValue({ id: currentSchemeId, name: currentSchemeName });
  }, [currentSchemeId, currentSchemeName]);

  return (
    <Autocomplete
      options={schemas}
      style={{ width: "140px" }}
      getOptionLabel={(option: any) => option.name}
      debug
      value={originalValue}
      size="small"
      closeIcon=""
      renderInput={(params: any) => <TextField {...params} margin="normal" />}
      onChange={(event: object, value: any) => handleOnChange(value)}
      getOptionSelected={(option: Scheme, value: Scheme) =>
        option.id === value.id
      }
      onBlur={handleOnBlur}
      disabled={!userId}
    />
  );
}
