import { Router, Redirect, Route, Switch } from "wouter";

import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./components/Home/Home";
import { Auth } from "./components/Auth/Auth";
import { ArticlePage } from "./components/ArticlePage/ArticlePage";
import { Container } from "@material-ui/core";

// TODO: change font style
// TODO: Refactor to tailwindcss
// TODO: Add form available from modal window

const App = () => {
  const user = JSON.parse(localStorage.getItem("sessionId") as string);

  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Switch>
          <Route path="/" component={() => <Redirect to="/articles" />} />
          <Route path="/articles" component={Home} />
          <Route path="/articles/search" component={Home} />
          <Route path="/articles/:id" component={ArticlePage} />
          <Route
            path="/auth"
            component={() => (!user ? <Auth /> : <Redirect to="/articles" />)}
          />
        </Switch>
      </Container>
    </>
  );
};

export default App;
