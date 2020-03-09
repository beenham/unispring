import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginModel from './loginComponent';
import RegisterComponent from "./registerComponent";
import UOSDashboardModules from "./UOSDashboardModules";
import UOSDashboardStats from "./UOSDashboardStats";
import UOSDashboardProfile from "./UOSDashboardProfile";
import 'babel-polyfill';

class BodyArea extends React.Component {
    render() {
        return <div id="body-area">
            <Router>
                <Route path='/login' exact component={LoginModel}/>
                <Route path='/register' exact component={RegisterComponent}/>
                <Route path='/modules' component={UOSDashboardModules}/>
                <Route path='/profile' component={UOSDashboardProfile}/>
                <Route path='/stats' component={UOSDashboardStats}/>
            </Router>
        </div>;
    }
}

ReactDOM.render(<BodyArea/>, document.getElementById('root'));
