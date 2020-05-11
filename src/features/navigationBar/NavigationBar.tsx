import React from "react";

import { useHistory } from "react-router-dom";
import { ExtendedAuthInstance, useFirebase } from "react-redux-firebase";

import {
  Drawer,
  List,
  makeStyles,
  ListItem,
  ListItemIcon,
  BottomNavigation,
  BottomNavigationAction,
  Tooltip,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DescriptionIcon from "@material-ui/icons/Description";
import CreateIcon from "@material-ui/icons/Create";

import { useIsMobile, useIsVerified } from "utils/customHooks";
import { Pages } from "layouts/constants";
import { logout } from "firebaseApi/crud";
import { clearLocalStorage } from "localStorage/api";

import * as types from "./types";

const STRIPE_URL = "https://stripe.com/blog/accessible-color-systems";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: theme.spacing(7) + 1,
    overflowX: "hidden",
    overflowY: "hidden",
  },
  drawer: {
    flexShrink: 0,
    whiteSpace: "nowrap",
    width: theme.spacing(7) + 1,
  },
  icon: {
    fontSize: 24,
  },
  iconContainer: {
    paddingTop: 25,
    paddingBottom: 25,
  },
  navBarBackground: {
    bottom: 0,
    left: 0,
    position: "fixed",
    width: "100%",
    zIndex: 4500,
    whiteSpace: "nowrap",
  },
  iconText: {
    fontWeight: 800,
    fontSize: 20,
  },
}));

const iconStyleOveride = makeStyles((theme) => ({
  root: {
    // minWidth: 60,
    color: "#fff",
  },
  selected: {},
}));

let ICONS: types.NavBarIcon[] = [
  {
    label: "Home",
    icon: HomeIcon,
    to: Pages.Home,
  },
  {
    label: "My Schemes",
    icon: CreateIcon,
    to: Pages.MySchemes,
  },
];

let LOGGEDIN_ICONS: types.NavBarIcon[] = [
  {
    label: "Logout",
    icon: ExitToAppIcon,
    to: Pages.Logout,
  },
];

let LOGGEDOUT_ICONS: types.NavBarIcon[] = [
  {
    label: "Login",
    icon: AccountBoxIcon,
    to: Pages.Login,
  },
];

export default function NavigationBar() {
  const classes = useStyles();
  const iconStyleOverideClasses = iconStyleOveride();
  const isMobile = useIsMobile();
  const history = useHistory();
  const isLoggedIn = useIsVerified();
  const firebase: ExtendedAuthInstance = useFirebase();
  const iconsToShow = isLoggedIn
    ? [...ICONS, ...LOGGEDIN_ICONS]
    : [...ICONS, ...LOGGEDOUT_ICONS];

  async function handleOnClick(path: string) {
    if (path === Pages.Logout) {
      await logout(firebase);
      window.location.reload();
      clearLocalStorage();
    } else {
      history.push(path);
    }
  }

  function sendToStripeArticle() {
    window.open(STRIPE_URL);
  }

  return (
    <div>
      {isMobile ? (
        <BottomNavigation className={classes.navBarBackground} showLabels>
          {iconsToShow.map((obj: types.NavBarIcon) => (
            <BottomNavigationAction
              classes={iconStyleOverideClasses}
              label={obj.label}
              icon={<obj.icon />}
              key={obj.label}
              onClick={() => handleOnClick(obj.to)}
              value={obj.label}
            />
          ))}
        </BottomNavigation>
      ) : (
        <Drawer
          variant="permanent"
          className={classes.drawer}
          classes={{
            paper: classes.paper,
          }}
          color="#fff"
        >
          <List>
            {iconsToShow.map((obj: types.NavBarIcon, i: number) => (
              <Tooltip key={i} title={obj.label}>
                <ListItem
                  button
                  className={classes.iconContainer}
                  onClick={() => handleOnClick(obj.to)}
                >
                  <ListItemIcon>
                    <obj.icon className={classes.icon} />
                  </ListItemIcon>
                </ListItem>
              </Tooltip>
            ))}
          </List>
          <List style={{ marginTop: "60vh" }}>
            <Tooltip
              title={
                "This tool is inspired by Stripe's great article written by Daryl Koopersmith and Wilson Miner"
              }
            >
              <ListItem
                button
                className={classes.iconContainer}
                onClick={sendToStripeArticle}
              >
                <ListItemIcon>
                  <DescriptionIcon className={classes.icon} />
                </ListItemIcon>
              </ListItem>
            </Tooltip>
          </List>
        </Drawer>
      )}
    </div>
  );
}
