import { useState } from "react";
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

interface AuthProps {}

export const Auth: React.FC<AuthProps> = ({}) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  const switchMode = () => {
    setIsSignedUp((prevIsSignedUp) => !prevIsSignedUp);
    setShowPassword(false);
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
          <Grid container justify="flex-end">
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
