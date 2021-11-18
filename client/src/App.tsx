import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { Articles } from "./components/Articles/Articles";
import { Form } from "./components/Form/Form";
import useStyles from "./styles";

// TODO: change font style
// TODO: Refactor to tailwindcss
// TODO: Form available from modal window

function App() {
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h2" align="center">
          Sightful
        </Typography>
      </AppBar>
      <Container>
        <Grow in>
          <Container>
            <Grid
              container
              justify="space-between"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={7}>
                <Articles />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </>
  );
}

export default App;
