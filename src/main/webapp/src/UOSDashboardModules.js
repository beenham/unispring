import React, { Component, Fragment } from "react";
import Navigation from "./nav";
import ModuleArea from "./moduleArea";

class UOSDashboardModules extends Component {
  render() {
    const { main, stage } = this.props;
    return (
      <Fragment>
        <Navigation stage={stage} />
        <ModuleArea />
      </Fragment>
    );
  }
}

export default UOSDashboardModules;
