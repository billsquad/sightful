import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    padding: "20px",
    borderRadius: "5px",
    margin: "40px auto",
    maxWidth: "1400px",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    margin: "0 auto",
    width: "100%",
    backgroundColor: "#fff",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      flexDirection: "column",
    },
  },
  section: {
    borderRadius: "20px",
    margin: "10px",
    flex: 1,
  },
  articleMessage: {
    marginTop: "40px",
  },
  recommendedPosts: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "5px",
    height: "39vh",
  },
}));
