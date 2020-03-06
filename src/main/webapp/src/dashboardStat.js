
import React from 'react';

function DashboardStat(props){

    return(
        <div className="level-item has-text-centered">
            <div>
                <p className="heading">{props.name}</p>
                <p className="title">{props.number}</p>
                <hr id="border-one" />
            </div>
        </div>
    );
}

export default DashboardStat;