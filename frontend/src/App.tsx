import React from "react";
import "tailwindcss/tailwind.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import PostProject from "./pages/PostProject";
import ViewProjects from "./ViewProjects";
import Navbar from "./components/Navbar";

const App = () => {
  const main = (
    <div>
      <Navbar />
      {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/postproject">
          <PostProject />
        </Route>
        <Route path="/viewProjects">
          <ViewProjects/>
        </Route>
        <Route path="/">
          <ViewProjects />
        </Route>
      </Switch>
    </div>

  );
  return (
    <Router>
      <AuthProvider>{main}</AuthProvider>
    </Router>
  );
};

export default App;
