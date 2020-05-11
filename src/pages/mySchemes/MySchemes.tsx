import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { ExtendedFirebaseInstance, useFirebase } from "react-redux-firebase";

import { Grid, makeStyles } from "@material-ui/core";

import ColorGradientSection from "features/colorGradientSection/ColorGradientSection";
import SettingsSection from "features/settingsSection/SettingsSection";
import ChangeColorSection from "features/changeColorSection/ChangeColorSection";
import LoadingScreen from "features/loadingScreen/LoadingScreen";
import LoadingSpinner from "features/loadingSpinner/LoadingSpinner";

import ColumnWise from "features/chart/columnWise/ColumnWise";
import RowWise from "features/chart/rowWise/RowWise";

import { changeMiddleWare as changeActiveCell } from "features/colorGradientSection/colorGradients/activeCellSlice";
import { changeSchema } from "features/colorGradientSection/colorGradients/colorGradientsSlice";
import { change as changeDropdownValue } from "features/colorGradientSection/toolbar/schemaDropdown/schemaDropdownSlice";

import { useIsMobile } from "utils/customHooks";
import { fetchScheme } from "firebaseApi/crud";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  widerWidth: {
    width: "500px",
  },
  width: {
    width: "300px",
  },
  flex: {
    flexGrow: 1,
  },
}));

interface RouterProps {
  match: any;
}

export default function MySchemes({ match }: RouterProps): JSX.Element {
  // scheme initialize is actually in feature: schemeDropdown
  // probably should be in here tho
  // auto-save-to-firebase in features: saveButton.
  // if saveButton appears in the ui, there will auto save.
  // probbaly should also be here
  const classes = useStyles();
  const firebase: ExtendedFirebaseInstance = useFirebase();
  const isMobile: boolean = useIsMobile();
  const schemeId: string = match.params.id;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchSubmittedScheme() {
      setLoading(true);
      const scheme = await fetchScheme(firebase, schemeId);
      dispatch(changeActiveCell({ row: 0, column: "input" }));
      dispatch(changeSchema(scheme));
      dispatch(changeDropdownValue(""));
      setLoading(false);
    }
    if (schemeId) {
      fetchSubmittedScheme();
    }
  }, [schemeId, dispatch, firebase]);

  const widthClass = clsx({
    [classes.width]: !isMobile,
    [classes.flex]: isMobile,
  });

  return (
    <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
      <LoadingScreen />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Grid container className={classes.root} spacing={2} justify="center">
          <Grid 
            item
            className={clsx({
              [classes.widerWidth]: !isMobile,
              [classes.flex]: isMobile,
            })}
          >
            <ColorGradientSection showTools={schemeId ? false : true} />
          </Grid>
          <Grid item>
            <Grid
              container
              // className={classes.root}
              spacing={2}
              direction="column"
              justify="center"
            >
              <Grid item>
                <Grid
                  container
                  // className={classes.root}
                  spacing={2}
                  justify="center"
                >
                  <Grid item className={widthClass}>
                    <ChangeColorSection />
                  </Grid>
                  <Grid item className={widthClass}>
                    <SettingsSection />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  // className={classes.root}
                  spacing={2}
                  justify="center"
                >
                  <Grid item className={widthClass}>
                    <ColumnWise />
                  </Grid>
                  <Grid item className={widthClass}>
                    <RowWise />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
