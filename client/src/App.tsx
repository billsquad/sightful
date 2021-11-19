import { Route } from "wouter";

import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./components/Home/Home";
import { Auth } from "./components/Auth/Auth";

// TODO: change font style
// TODO: Refactor to tailwindcss
// TODO: Form available from modal window

function App() {
  return (
    <>
      <Navbar />
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
    </>
  );
}

export default App;
