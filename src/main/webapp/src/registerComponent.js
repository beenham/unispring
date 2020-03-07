
import React, {Component} from 'react';

import axios from 'axios';

class RegisterComponent extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            firstname: '',
            surname: '',
            emailAddress:'',
            studentNumber: '',
            phoneNumber: '',
            password: '',
            streetAddress: '',
            town: '',
            city: '',
            country:'',
            gender:''
        }
    };

    handleClick(event){
        let apiBaseUrl = "http://localhost:8080/api/auth";
        let self = this;
        let payload={
            "firstname": this.state.firstname,
            "surname": this.state.surname,
            "emailAddress": this.state.emailAddress,
            "studentNumber": this.state.studentNumber,
            "phoneNumber": this.state.phoneNumber,
            "password": this.state.password,
            "streetAddress": this.state.streetAddress,
            "town": this.state.town,
            "city": this.state.city,
            "country": this.state.country,
            "gender": this.state.gender
        };
        console.log(payload);
        axios.post(apiBaseUrl+'/student/register', payload)
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
        return(

                         <div id="register-area" data-content="8">
            <form>

               <div className="field">
                  <label className="label is-small">First Name</label>
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-small" type="text" placeholder="First Name"  name="firstName" onChange={e => this.setState({
                        firstname:e.target.value
                    })}/>
                    <span className="icon is-small is-left">
                     <i className="material-icons">brush</i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"/>
                    </span>
                  </div>
               </div>

               <div className="field">
                  <label className="label is-small">Surname</label>
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-small" type="text" placeholder="Surname" name="sureName" onChange={e => this.setState({
                        surname:e.target.value
                    })}/>
                    <span className="icon is-small is-left">
                     <i className="material-icons">edit</i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"/>
                    </span>
                  </div>
               </div>

                <div className="field">
                    <label className="label is-small">Surname</label>
                    <div className="control has-icons-left has-icons-right">
                        <input className="input is-small" type="text" placeholder="Gender" name="gender" onChange={e => this.setState({
                            gender:e.target.value
                        })}/>
                        <span className="icon is-small is-left">
                     <i className="material-icons">edit</i>
                    </span>
                        <span className="icon is-small is-right">
                      <i className="fas fa-check"/>
                    </span>
                    </div>
                </div>

               <div className="field">
                  <label className="label is-small">Student Number</label>
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-small" type="number" placeholder="Student Number" name="studentNumber" onChange={e => this.setState({
                        studentNumber:e.target.value
                    })}/>
                    <span className="icon is-small is-left">
                     <i className="material-icons">person</i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"/>
                    </span>
                  </div>
               </div>

               <div className="field">
                  <label className="label is-small">Email</label>
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-small" type="email" placeholder="Email" name="emailAddress" onChange={e => this.setState({
                        emailAddress:e.target.value
                    })}/>
                    <span className="icon is-small is-left">
                     <i className="material-icons">email</i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"/>
                    </span>
                  </div>
                </div>

                <div className="field">
                    <label className="label is-small">Email</label>
                    <div className="control has-icons-left has-icons-right">
                        <input className="input is-small" type="password" placeholder="password" name="password" onChange={e => this.setState({
                            password:e.target.value
                        })}/>
                        <span className="icon is-small is-left">
                     <i className="material-icons">email</i>
                    </span>
                        <span className="icon is-small is-right">
                      <i className="fas fa-check"/>
                    </span>
                    </div>
                </div>

                <div className="field">
                    <label className="label is-small">Email</label>
                    <div className="control has-icons-left has-icons-right">
                        <input className="input is-small" type="password" placeholder="password" name="password" />
                        <span className="icon is-small is-left">
                     <i className="material-icons">email</i>
                    </span>
                        <span className="icon is-small is-right">
                      <i className="fas fa-check"/>
                    </span>
                    </div>
                </div>

               <div className="field">
                  <label className="label is-small">Phone Number</label>
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-small" type="number" placeholder="Phone Number" name="phoneNumber" onChange={e => this.setState({
                        phoneNumber:e.target.value
                    })}/>
                    <span className="icon is-small is-left">
                     <i className="material-icons">phone</i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"/>
                    </span>
                  </div>
               </div>

               <div className="field">
                  <label className="label is-small">Address</label>
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-small" type="text" placeholder="Street Address"  name="streetAddress" onChange={e => this.setState({
                        streetAddress:e.target.value
                    })}/>
                    <span className="icon is-small is-left">
                     <i className="material-icons">location_on</i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"/>
                    </span>
                  </div>
               </div>

               <div className="field">
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-small" type="text" placeholder="Town" name="town" onChange={e => this.setState({
                        town:e.target.value
                    })}/>
                    <span className="icon is-small is-left">
                     <i className="material-icons">location_city</i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"/>
                    </span>
                  </div>
               </div>

               <div className="field">
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-small" type="text" placeholder="City" name="city" onChange={e => this.setState({
                        city:e.target.value
                    })}/>
                    <span className="icon is-small is-left">
                     <i className="material-icons">public</i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"/>
                    </span>
                  </div>
               </div>

                <div className="field">
                    <div className="control has-icons-left has-icons-right">
                        <input className="input is-small" type="text" placeholder="Country" name="country" onChange={e => this.setState({
                            country:e.target.value
                        })}/>
                        <span className="icon is-small is-left">
                     <i className="material-icons">public</i>
                    </span>
                        <span className="icon is-small is-right">
                      <i className="fas fa-check"/>
                    </span>
                    </div>
                </div>



               <div className="field is-grouped is-grouped-right">
                  <p className="control">
                     <button className="button is-primary is-small" type="button" onClick={(event) => this.handleClick(event)}>Register</button>
                  </p>
                </div>

            </form>
        </div>

        );
    }
}

export default RegisterComponent;