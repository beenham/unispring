
import React from 'react';


function LoginModel() {
      return(<div id="login-reg-bg">
        <div className="main-box" id="log-in-reg">
      <div>
         <h1 className="title is-2 is-centered">University of Springfield</h1>
         <div className="buttons has-addons is-centered tabs">
            <button className="button on-button">Login</button>
            <button className="button"  data-tab="8">Register</button>
         </div>
         <div id="login-area">
            <form>
               <div className="field">
                  <p className="control has-icons-left is-small has-icons-right">
                    <input className="input is-small" type="email" placeholder="Email" />
                    <span className="icon is-small is-left">
                     <i className="material-icons">email</i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left is-small">
                    <input className="input is-small" type="password" placeholder="Password" />
                    <span className="icon is-small is-left">
                      <i className="material-icons">lock</i>
                    </span>
                  </p>
                </div>
                <div className="field is-grouped is-grouped-right">
                  <p className="control">
                    <a className="button is-primary is-small">Login</a>
                  </p>
                  
                </div>
            </form>
         </div>
         {/* <div id="register-area" data-content="8">
            <form>
 
               <div className="field">
                  <label className="label is-small">First Name</label>
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-small" type="text" placeholder="First Name" />
                    <span className="icon is-small is-left">
                     <i className="material-icons">brush</i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"></i>
                    </span>
                  </div>
               </div>
 
               <div className="field">
                  <label className="label is-small">Surname</label>
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-small" type="text" placeholder="Surname" />
                    <span className="icon is-small is-left">
                     <i className="material-icons">edit</i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"></i>
                    </span>
                  </div>
               </div>
 
               <div className="field">
                  <label className="label is-small">Student Number</label>
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-small" type="number" placeholder="Student Number" />
                    <span className="icon is-small is-left">
                     <i className="material-icons">person</i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"></i>
                    </span>
                  </div>
               </div>
 
               <div className="field">
                  <label className="label is-small">Email</label>
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-small" type="email" placeholder="Email" />
                    <span className="icon is-small is-left">
                     <i className="material-icons">email</i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"></i>
                    </span>
                  </div>
                </div>
 
               <div className="field">
                  <label className="label is-small">Phone Number</label>
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-small" type="number" placeholder="Phone Number" />
                    <span className="icon is-small is-left">
                     <i className="material-icons">phone</i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"></i>
                    </span>
                  </div>
               </div>
 
               <div className="field">
                  <label className="label is-small">Address</label>
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-small" type="text" placeholder="Street Address" />
                    <span className="icon is-small is-left">
                     <i className="material-icons">location_on</i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"></i>
                    </span>
                  </div>
               </div>
 
               <div className="field">
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-small" type="text" placeholder="Town" />
                    <span className="icon is-small is-left">
                     <i className="material-icons">location_city</i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"></i>
                    </span>
                  </div>
               </div>
 
               <div className="field">
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-small" type="text" placeholder="City" />
                    <span className="icon is-small is-left">
                     <i className="material-icons">public</i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"></i>
                    </span>
                  </div>
               </div>
 
               
 
               <div className="field is-grouped is-grouped-right">
                  <p className="control">
                    <a className="button is-primary">
                      Submit
                    </a>
                  </p>
                </div>
 
            </form>
        </div> */}
      </div>
      
    </div>
      </div>
    );
  }

  export default LoginModel;