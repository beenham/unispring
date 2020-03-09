import React from "react";

function DashboardStat(props) {
  return (
    <div className="level-item has-text-centered">
      <div className="dashboard-div">
        <p className="heading">{props.name}</p>
        <p className="title">{props.number}</p>
        <hr id={props.id} />
      </div>
    </div>
  );
}

export default DashboardStat;
