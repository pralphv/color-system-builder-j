import React, { useState, useEffect } from "react";
import clsx from "clsx";

import { useHistory } from "react-router-dom";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";

import LoadingScreen from "features/loadingScreen/LoadingScreen";
import LoadingSpinner from "features/loadingSpinner/LoadingSpinner";
import { useIsMobile, useWindow } from "utils/customHooks";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "200px",
  },
  width: {
    width: "250px",
  },
  paper: {
    padding: theme.spacing(2),
    cursor: "pointer",
    "&:hover": {
      background: "#353535",
    },
  },
}));

const MAX_BOX_HEIGHT: number = 200;

export default function Home(): JSX.Element {
  const classes = useStyles();
  const isMobile: boolean = useIsMobile();
  const history = useHistory();

  let { width } = useWindow();
  const widthClass = clsx({
    [classes.width]: !isMobile,
  });

  const [data, setData] = useState<Object>({});
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const resp = await fetch(
        "https://color-system-builder-j-func.web.app/user-submitted-schemes"
      );
      const data = await resp.json();
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  width = isMobile ? width * 0.9 : -1;

  function handleOnClick(schemeId: string) {
    history.push(`/schemes/${schemeId}`);
  }

  return (
    <div>
      <LoadingScreen />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Grid container spacing={2} justify="center">
          {Object.entries(data).map(([schemeId, obj]: [string, any]) => (
            <Grid
              item
              className={widthClass}
              key={schemeId}
              style={{ width }}
              onClick={() => handleOnClick(schemeId)}
            >
              <Paper className={classes.paper}>
                {obj.colorGradient.map((rowObj: any, rowIndex: number) => {
                  const numberOfRows = Object.keys(obj.colorGradient).length;
                  return (
                    <Grid key={`row${rowIndex}`} container>
                      {rowObj.colorGradient.map(
                        (columnObj: any, columnIndex: number) => (
                          <Grid
                            item
                            xs={1}
                            key={`row${rowIndex}@column${columnIndex}`}
                          >
                            <div
                              style={{
                                background: columnObj.hex,
                                height: MAX_BOX_HEIGHT / numberOfRows,
                              }}
                            ></div>
                          </Grid>
                        )
                      )}
                    </Grid>
                  );
                })}
                <br />
                <Typography variant="body2">{obj.name}</Typography>
                <Typography variant="body2" color="primary">
                  {obj.likes} Likes
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
