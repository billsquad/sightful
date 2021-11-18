import { useState, useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { getArticles } from "./actions/articles";
import { Articles } from "./components/Articles/Articles";
import { Form } from "./components/Form/Form";
import useStyles from "./styles";

// TODO: change font style
// TODO: Refactor to tailwindcss
// TODO: Form available from modal window

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch, setCurrentId]);

  return (
    <>
      <AppBar className={classes.appBar} position="static">
        <Typography variant="h2" align="center">
          sightful
        </Typography>
      </AppBar>
      <Container>
        <Grow in>
          <Container>
            <Grid
              container
              justifyContent="space-between"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={7}>
                <Articles setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </>
  );
}

export default App;
