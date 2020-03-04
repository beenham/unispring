
import React from 'react';
import Dashboard from './dashboard';
import ModuleArea from './moduleArea';
import Profile from './profile';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function InformationArea(){

      return(<div id="infoPage">
        <Router>
          <Switch>
            <Route path='/modules' component={ModuleArea}></Route>
            <Route path='/profile' component={Profile}></Route>
            <Route path='/dashboard' component={Dashboard}></Route>
          </Switch>
        </Router>
      </div>);
  }

  export default InformationArea;