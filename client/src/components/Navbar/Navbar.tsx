import { AppBar, Typography } from "@material-ui/core";
import { Avatar, Button, Toolbar } from "@mui/material";
import { Link } from "wouter";
import useStyles from "./styles";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const classes = useStyles();

  const user = null;

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
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt="" src="">
              A
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              Name
            </Typography>
            <Button variant="contained" color="secondary">
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
