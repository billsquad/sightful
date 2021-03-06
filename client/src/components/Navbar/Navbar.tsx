import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "wouter";
import { AppBar, Typography } from "@material-ui/core";
import { Avatar, Button, Toolbar } from "@material-ui/core";
import decode, { JwtPayload } from "jwt-decode";

import * as actionType from "../../constants/actionTypes";
import useStyles from "./styles";

type customJwtPayload = JwtPayload & { exp: number };

export const Navbar = () => {
  const localStorageJSON = JSON.parse(
    localStorage.getItem("sessionId") as string
  );

  const classes = useStyles();
  const [user, setUser] = useState(localStorageJSON);
  const dispatch = useDispatch();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token) as customJwtPayload;

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(localStorageJSON);
  }, [location]);

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    setLocation("/auth");

    setUser(null);
  };

  return (
    <AppBar className={classes.appBar} position="static">
      <div className={classes.brandContainer}>
        <Typography variant="h2" align="center">
          <Link className={classes.heading} href="/">
            sightful
          </Link>
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            {user.result.name ? (
              <Avatar
                className={classes.purple}
                alt={user?.result.name}
                src={user?.result.imageUrl}
              >
                {user?.result.name.charAt(0) || user?.result.username.charAt(0)}
              </Avatar>
            ) : (
              <div className={`${classes.purple} ${classes.usernameBox}`}>
                {user?.result.username.charAt(0)}
              </div>
            )}
            <Typography className={classes.userName} variant="h6">
              {user?.result.name || user?.result.username}
            </Typography>
            <Button variant="contained" color="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/auth" className={classes.heading}>
            Sign In
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};
