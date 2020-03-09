
import React, {Component, Fragment} from 'react';
import Navigation from './nav';
import Profile from './profile';

class UOSDashboardProfile extends Component{

    render(){

        const { main, stage } = this.props;
        return(
            <Fragment>
                <Navigation stage={stage}/>
                <Profile/>
            </Fragment>
        );
    }
}

export default UOSDashboardProfile;