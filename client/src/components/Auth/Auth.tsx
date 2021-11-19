import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "wouter";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { CustomInput } from "./Input";
import useStyles from "./styles";
import GoogleSignIcon from "./icon";
import { AUTH } from "../../constants/actionTypes";

interface AuthProps {}

export const Auth: React.FC<AuthProps> = ({}) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const dispatch = useDispatch();
  const [location, setLocation] = useLocation();

  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  const switchMode = () => {
    setIsSignedUp((prevIsSignedUp) => !prevIsSignedUp);
    setShowPassword(false);
  };

  const googleSuccess = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    let result;
    let token;

    if ("profileObj" in res && "tokenId" in res) {
      result = res?.profileObj;
      token = res?.tokenId;
    }

    try {
      dispatch({ type: AUTH, data: { result, token } });
      setLocation("/");
    } catch (error) {
      console.error(error);
    }
  };
  const googleFailure = (error: any) => {
    console.log(error);
    console.log("Unsuccessful sign in with Google.");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignedUp ? "Sign In" : "Sign Up"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {!isSignedUp && (
              <CustomInput
                name="username"
                label="Username"
                handleChange={handleChange}
                type="username"
                autoFocus
              />
            )}
            <CustomInput
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
              autoFocus
            />
            <CustomInput
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              autoFocus
            />
            {!isSignedUp && (
              <CustomInput
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
                autoFocus
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {!isSignedUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="887144875626-po2u6nidd7irtspis4mhulh6fseli4cm.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<GoogleSignIcon />}
                variant="outlined"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {!isSignedUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
