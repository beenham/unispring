
import React, {Component} from 'react';

import axios from 'axios';

class LoginModel extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            emailAddress: 'test@ahs.com',
            password: 'dxcfgv'
        }
    };


    handleClick(event){
        let apiBaseUrl = "http://localhost:8080/api/auth";
        let self = this;
        let payload={
            "emailAddress":this.state.emailAddress,
            "password":this.state.password
        };
        console.log(payload);
        axios.post(apiBaseUrl+'/login', payload)
            .then(function (response) {

                if(response.data.code == 200){
                    console.log("Login successfull");
                    var uploadScreen=[];
                    uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>);
                    self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
                }
                else if(response.data.code == 204){
                    console.log("Username password do not match");
                    alert("username password do not match")
                }
                else{
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            })
            .catch(function (error) {
                console.log("error:" ,error);
            });
    };

      render(){
          return(<div id="login-reg-bg">
                  <div className="main-box" id="log-in-reg">
                      <div>
                          <h1 className="title is-2 is-centered">University of Springfield</h1>
                          <div className="buttons has-addons is-centered tabs">
                              <button className="button on-button">Login</button>
                              <button className="button"  data-tab="8">Register</button>
                          </div>
                          <div id="login-area">
                              <form action="http://localhost:8080/api/auth/login" method="post">
                                  <div className="field">
                                      <p className="control has-icons-left is-small has-icons-right">
                                          <input className="input is-small" type="email" placeholder="Email" name="emailAddress" onChange={e => this.setState({
                                              emailAddress:e.target.value
                                          })} />
                                          <span className="icon is-small is-left">
                                            <i className="material-icons">email</i>
                                          </span>
                                      </p>
                                  </div>
                                  <div className="field">
                                      <p className="control has-icons-left is-small">
                                          <input className="input is-small" type="password" placeholder="Password"  name="password" onChange={e => this.setState({
                                              password:e.target.value
                                          })}/>
                                          <span className="icon is-small is-left">
                                              <i className="material-icons">lock</i>
                                            </span>
                                      </p>
                                  </div>
                                  <div className="field is-grouped is-grouped-right">
                                      <p className="control">
                                          <button className="button is-primary is-small" type="button" onClick={(event) => this.handleClick(event)}>Login</button>
                                      </p>

                                  </div>
                              </form>
                          </div>
                      </div>

                  </div>
              </div>
          );
      }
  }

  export default LoginModel;