import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginComponent from "./loginComponent";
import RegisterComponent from "./registerComponent";
import "babel-polyfill";
import Navigation from "./nav";
import Profile from "./profile";
import Dashboard from "./dashboard";
import ModuleArea from "./moduleArea";

class BodyArea extends React.Component {
  render() {
    return (
      <div id="body-area">
        <Router>
          <Route path="/login" exact component={LoginComponent} />
          <Route path="/register" exact component={RegisterComponent} />
          <Route path="/(modules|profile|stats)"
            render={() => (
              <Fragment>
                <Navigation />
                <Router>
                  <Route path="/modules" component={ModuleArea} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/stats" component={Dashboard} />
                </Router>
              </Fragment>
            )}
          />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<BodyArea />, document.getElementById("root"));
