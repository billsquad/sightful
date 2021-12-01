import { deepPurple } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0 0 30px",
    padding: "10px 50px",
    backgroundColor: "#6f1fa994",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  heading: {
    color: "#fff",
    textDecoration: "none",
  },
  image: {
    marginLeft: "15px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
    width: "400px",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "300px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  usernameBox: {
    width: "50px",
    height: "50px",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    borderRadius: "50%",
  },
}));
