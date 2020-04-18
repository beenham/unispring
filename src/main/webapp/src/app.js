import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import "babel-polyfill";
import Navigation from "./nav";
import Profile from "./profile";
import Dashboard from "./dashboard";
import ModuleArea from "./moduleArea";
import { isLoggedIn } from "./util";

class App extends React.Component {
  render() {
    return (
      <div id="body-area">
        <Router>
            <Route path="/login" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route
            path="/(modules|profile|stats)"
            render={() => {
              if (!isLoggedIn()) return <Redirect to="/login" />;
              return (
                <Fragment>
                  <Navigation />
                  <Router>
                    <Route path="/modules" component={ModuleArea} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/stats" component={Dashboard} />
                  </Router>
                </Fragment>
              );
            }}
          />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
