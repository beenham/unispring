import React from 'react';
import ReactDOM from 'react-dom';
import InformationArea from './informationArea';
import Navigation from './nav';
import 'babel-polyfill';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginModel from './loginRegister';
import RegisterComponent from "./registerComponent";

class BodyArea extends React.Component{
  render(){
    return <div id="body-area">
      <Navigation/>
      <InformationArea/>
      <Router>
        <Route path='/' exact component={LoginModel}/>
        <Route path='/Information/Modules' component={InformationArea}/>
      </Router>
    </div>;
  }
}
ReactDOM.render(<BodyArea/>, document.getElementById('root'));


{/* <Router>
  <Route path="/" exact component={LoginRegModal}></Route>
  <Route path="/page" component={BodyArea}></Route>
</Router> */}