
import React, {Fragment} from 'react';
import DashboardStat from './dashboardStat';

function DashBoardStatDisplay(props){

    return(
        <Fragment>
            <DashboardStat name="Stage One" number={props.ONE}/>
            <DashboardStat name="Stage Two" number={props.TWO}/>
            <DashboardStat name="Stage Three" number={props.THREE}/>
            <DashboardStat name="Stage Four" number={props.FOUR}/>
            <DashboardStat name="Masters" number={props.MASTERS}/>
            <DashboardStat name="Doctorate" number={props.DOCTORATE}/>
        </Fragment>
    );
}

export default DashBoardStatDisplay;