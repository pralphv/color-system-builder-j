import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";

import useMediaQuery from "@material-ui/core/useMediaQuery";

import { RootState } from "app/rootReducer";
import * as types from "./types";

export function useWindow(): types.Window {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    setHeight(window.innerHeight);
    setWidth(window.screen.width);

    // Bind the event listener
    window.addEventListener("resize", handleSetTable);
    return () => {
      // Unbind the event listener on clean up
      window.removeEventListener("resize", handleSetTable);
    };
  }, []);

  function handleSetTable() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    setWidth(windowWidth);
    setHeight(windowHeight);
  }

  return { width, height };
}

export function useIsMobile(): boolean {
  const isMobile: boolean = useMediaQuery("(max-width:600px)");
  return isMobile;
}

export function useIsVerified(): boolean {
  const isVerified = useSelector(
    (state: any) => state.firebase.auth.emailVerified
  );
  return isVerified;
}

export function useUserId(): string {
  const userId = useSelector((state: any) => state.firebase.auth.uid);
  return userId;
}

export function useUserProfile(): any {
  const profile = useSelector((state: RootState) => state.firebase.profile);
  return profile;
}

export function useContentHasChanged(): boolean {
  const schemaId: string = useSelector((state: RootState) => state.dropdown);
  const colorGradient = useSelector((state: RootState) => state.colorGradients);
  const profile = useUserProfile();
  const colorGradientFromDatabase = profile[schemaId]?.colorGradient;
  if (!colorGradientFromDatabase) {
    return true;
  }
  return !isEqual(Object.values(colorGradient), colorGradientFromDatabase);
}
