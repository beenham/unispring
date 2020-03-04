import React from 'react';
import ReactDOM from 'react-dom';
import InformationArea from './informationArea';
import Navigation from './nav';


import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginModel from './loginRegister';

class BodyArea extends React.Component{
  render(){
    return <div id="body-area">
      <Navigation></Navigation>
      <InformationArea></InformationArea>
      <Router>
        <Route path='/' exact component={LoginModel}></Route>
        <Route path='/Information/Modules' component={InformationArea}></Route>
      </Router>
    </div>;
  }
}
ReactDOM.render(<BodyArea></BodyArea>, document.getElementById('root'));


{/* <Router>
  <Route path="/" exact component={LoginRegModal}></Route>
  <Route path="/page" component={BodyArea}></Route>
</Router> */}