import React, { Component, Fragment } from "react";
import Navigation from "./nav";
import Dashboard from "./dashboard";

class UOSDashboardStats extends Component {
  render() {
    const { main, stage } = this.props;
    return (
      <Fragment>
        <Navigation stage={stage} />
        <Dashboard />
      </Fragment>
    );
  }
}

export default UOSDashboardStats;
